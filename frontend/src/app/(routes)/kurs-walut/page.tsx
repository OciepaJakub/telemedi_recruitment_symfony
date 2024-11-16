import { ExchangeRate } from "@/app/types/models/exchangeRate";
import { ExchangeRatesResponse } from "@/app/types/response/exchangeRatesResponse";
import Column from "@/components/grid/Column";
import Container from "@/components/grid/Container";
import Row from "@/components/grid/Row";
import ExchangeRatesTable from "./ExchangeRatesTable";

const ExchangeRatePage = async () => {

    const getDisplayDate = (): string => {
        const now = new Date();
        const isAfternoon = now.getHours() >= 12;

        const displayDate = isAfternoon
            ? now
            : new Date(now.setDate(now.getDate() - 1));

        
        const day = String(displayDate.getDate()).padStart(2, "0");
        const month = String(displayDate.getMonth() + 1).padStart(2, "0");
        const year = displayDate.getFullYear();

        return displayDate.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    };

    const displayDate = getDisplayDate();
    const today = new Date().toLocaleDateString();
    const exchangeRates = await fetchExchangeRates();
    
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
                            <ExchangeRatesTable data={exchangeRates.data} today={displayDate} />
                        </Column>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ExchangeRatePage;

const fetchExchangeRates = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exchange-rates`);

    if (!res.ok) {
        throw new Error('Failed to fetch exchange rates');
    }

    const data: ExchangeRatesResponse<ExchangeRate> = await res.json();

    return data;
}