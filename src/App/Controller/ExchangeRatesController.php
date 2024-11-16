<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\ExchangeRatesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class ExchangeRatesController extends AbstractController
{
    private $exchangeRatesRepository;
    private $cache;

    public function __construct(ExchangeRatesRepository $exchangeRatesRepository, CacheInterface $cache)
    {
        $this->exchangeRatesRepository = $exchangeRatesRepository;
        $this->cache = $cache;
    }

    public function index(Request $request) {
        $currencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];
        $startDate = strip_tags($request->query->get('start_date', ''));

        if ($startDate && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $startDate)) {
            throw new \InvalidArgumentException("Invalid start date format");
        }

        $cacheKey = 'currency_data_' . md5(implode('_', $currencies) . '_' . $startDate);
        
        $currencyData = $this->cache->get($cacheKey, function (ItemInterface $item) use ($currencies, $startDate) {
            $item->expiresAfter(3600);

            return $this->exchangeRatesRepository->fetchFilteredCurrencies($currencies, $startDate);
        });

        return $this->json($currencyData);
    }
}
