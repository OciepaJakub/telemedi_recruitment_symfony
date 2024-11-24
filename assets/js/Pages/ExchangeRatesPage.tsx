import React, { useEffect, useState } from 'react';

import ExchangeRatesTable from '../components/ExchangeRatesTable';
import Column from '../components/grid/Column';
import Container from '../components/grid/Container';
import Row from '../components/grid/Row';
import { ExchangeRate } from '../types/models/exchangeRate';
import { ExchangeRatesResponse } from '../types/response/exchangeRatesResponse';
import apiClient from '../utils/axios';

const ExchangeRatesPage: React.FC = () => {
    const [exchangeRates, setExchangeRates] = useState<ExchangeRatesResponse<ExchangeRate>>();

    const getDisplayDate = (): string => {
        const now = new Date();
        const isAfternoon = now.getHours() >= 12;

        const displayDate = isAfternoon
            ? now
            : new Date(now.setDate(now.getDate() - 1));


        return displayDate.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    };

    const displayDate = getDisplayDate();
    const today = new Date().toLocaleDateString();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchExchangeRates();

            setExchangeRates(data);
        }

        fetchData()
    }, [])

    return (
        <>
            <section id="exchange-rates-tables" className="my-10">
                <Container>
                    <Row>
                        <Column>
                            <h1 className="text-3xl text-primary mb-6 font-bold">
                                Tabela kursów walut z dnia {displayDate}
                            </h1>
                            {today > displayDate ? <p className="text-primary text-xl">Kurs z dnia dzisiejszego pojawi się po godzinie 12:00.</p> : ''}
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {exchangeRates &&
                                <ExchangeRatesTable data={exchangeRates.data} today={displayDate} />
                            }
                        </Column>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ExchangeRatesPage;

const fetchExchangeRates = async () => {
    const res = await apiClient.get(`/exchange-rates`);
    
    if (res.status != 200) {
        throw new Error('Failed to fetch exchange rates');
    }

    const data: ExchangeRatesResponse<ExchangeRate> = res;

    return data;
}