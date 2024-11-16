<?php

namespace App\DTO;

class ExchangeRatesDTO
{
    private $code;
    private $currency;
    private $mid;
    private $sellPrice;
    private $buyPrice;
    private $startDate;

    public function __construct(string $code, string $currency, float $mid, float $sellPrice, float $buyPrice = 0.00, string $startDate = null)
    {
        $this->code = $code;
        $this->currency = $currency;
        $this->mid = $mid;
        $this->sellPrice = $sellPrice;
        $this->buyPrice = $buyPrice;
        $this->startDate = $startDate;
    }

    public function toArray(): array
    {
        return [
            'code' => $this->code,
            'currency' => $this->currency,
            'mid' => $this->mid,
            'sellPrice' => $this->sellPrice,
            'buyPrice' => $this->buyPrice,
            'startDate' => $this->startDate,
        ];
    }
}
