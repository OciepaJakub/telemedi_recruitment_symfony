<?php

namespace Integration\ExchangeRates;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ExchangeRatesTest extends WebTestCase
{
    public function testValidCurrencyFetch()
{
    $client = static::createClient();
    
    $url = '/api/v1/exchange-rates';
    
    $client->request('GET', $url);
    
    $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Spodziewano się kodu odpowiedzi 200.");
    
    $responseContent = json_decode($client->getResponse()->getContent(), true);
    
    $this->assertIsArray($responseContent, "Odpowiedź powinna być tablicą.");
    $this->assertNotEmpty($responseContent, "Odpowiedź nie powinna być pusta.");
    
    foreach ($responseContent as $currencyData) {
        $this->assertArrayHasKey('code', $currencyData, "Brakuje pola 'code'");
        $this->assertArrayHasKey('currency', $currencyData, "Brakuje pola 'currency'");
        $this->assertArrayHasKey('mid', $currencyData, "Brakuje pola 'mid'");
        $this->assertArrayHasKey('sellPrice', $currencyData, "Brakuje pola 'sellPrice'");
        $this->assertArrayHasKey('buyPrice', $currencyData, "Brakuje pola 'buyPrice'");
        
        $this->assertIsString($currencyData['code'], "'code' powinien być typu string.");
        $this->assertIsString($currencyData['currency'], "'currency' powinien być typu string.");
        $this->assertIsFloat($currencyData['mid'], "'mid' powinien być typu float.");
        $this->assertIsFloat($currencyData['sellPrice'], "'sellPrice' powinien być typu float.");
        $this->assertTrue(is_float($currencyData['buyPrice']) || $currencyData['buyPrice'] === 0, "'buyPrice' powinien być typu float, bądź 0.");
    }
}

    public function testStartDateTooOld()
    {
        $client = static::createClient();

        $unsupportedDate = '2000-08-01';
        $url = '/api/v1/exchange-rates?start_date=' . $unsupportedDate;

        $client->request('GET', $url);

        $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Spodziewano się kodu odpowiedzi 200.");

        $responseContent = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('404 NotFound - Bark danych / No data available', $responseContent['error'], "Spodziewano się odpowiedzi: 'Bark danych / No data available'.");
    }
}
