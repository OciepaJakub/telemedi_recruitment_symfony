<?php

declare(strict_types=1);

namespace App\Repository;

use App\DTO\ExchangeRatesDTO;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use DateTime;

class ExchangeRatesRepository
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    /**
     * Fetch and filter currency data from NBP API based on selected currencies and start date.
     *
     * @param array $selectedCurrencies List of currency codes to filter.
     * @param string|null $startDate Start date for the API 'YYYY-MM-DD' format.
     * @return ExchangeRatesDTO[] Array of filtered and modified ExchangeRatesDTOs.
     */
    public function fetchFilteredCurrencies(array $selectedCurrencies, ?string $startDate = null): array
    {
        $startDate = $startDate ?? (new DateTime())->format('Y-m-d');

        $url = 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json';
        
        if ($startDate) {
            $start = new DateTime($startDate);

            $url = sprintf(
                'https://api.nbp.pl/api/exchangerates/tables/A/%s/?format=json',
                $start->format('Y-m-d')
            );
        }

        $response = $this->httpClient->request('GET', $url);

        if($response->getStatusCode() == 404){
            return ['error' => $response->getContent(false)];
        }
        
        if($response->getStatusCode() !== 200){
            return ['error' => 'Wystąpił problem podczas pobierania danych. Prosimy spróbować ponownie później.'];
        }

        $data = $response->toArray()[0]['rates'];

        $currencyData = array_filter($data, function($rate) use ($selectedCurrencies) {
            return in_array($rate['code'], $selectedCurrencies);
        });

        $dtoCollection = [];

        foreach ($currencyData as $currencyRate) {
            $currency = $currencyRate['currency'];
            $code = $currencyRate['code'];
            $mid = $currencyRate['mid'];
            $sellPrice = $mid;
            $buyPrice = $mid;

            if (in_array($code, ['EUR', 'USD'])) {
                (float) $sellPrice += 0.07;
                (float) $buyPrice -= 0.05;
            } elseif (in_array($code, ['CZK', 'IDR', 'BRL'])) {
                (float) $buyPrice = 0.00;
                (float) $sellPrice += 0.15;
            }

            $dtoCollection[] = (new ExchangeRatesDTO($code, $currency, $mid, $sellPrice, $buyPrice, $startDate))->toArray();
        }

        return $dtoCollection;
    }
}
