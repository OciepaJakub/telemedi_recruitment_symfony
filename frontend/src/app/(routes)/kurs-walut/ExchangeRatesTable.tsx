'use client';

import { ExchangeRatesResponse } from "@/app/types/response/exchangeRatesResponse";
import { formatDate } from "@/app/utils/formatDate";
import { ExchangeRate } from "@/types/models/exchangeRate"
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const ExchangeRatesTable = ({ data, today }: { data: ExchangeRate[], today: string }) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [exchangeRatesByDate, setExchangeRatesByDate] = useState<ExchangeRate[]>([]);
    const [dateParam, setDateParam] = useState<string>('');

    const minDate = '2023-01-01';
    const maxDate = new Date().toISOString().split('T')[0];

    const loadExchangeByDate = async (date: string) => {
        if (!date || date.length === 0) {
            setError("Data jest wymagana!");
            return;
        }

        if (date < minDate) {
            setError(`Podana data nie może być wcześniejsza niż ${minDate}.`);
            return;
        }

        if (date > maxDate) {
            setError(`Podana data nie może być większa niż ${maxDate}.`);
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/exchange-rates?start_date=${date}`);
            if (!res.ok) throw new Error("Failed to fetch exchange rates");

            const result: ExchangeRatesResponse<ExchangeRate> = await res.json();
            if ("error" in result.data) {
                setError("Nie znaleziono danych dla podanej daty, prosimy wybrać inną datę.");
                setExchangeRatesByDate([]);
                return;
            }

            setExchangeRatesByDate(result.data);
        } catch (err) {
            setError("Wystąpił błąd podczas ładowania danych.");
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date: string) => {
        setDateParam(date);

        const url = new URL(window.location.href);
        url.searchParams.set("start_date", date);
        window.history.pushState({}, "", url.toString());

        loadExchangeByDate(date);
    };

    useEffect(() => {
        const url = new URL(window.location.href);
        const startDate = url.searchParams.get("start_date");

        if (startDate) {
            setDateParam(startDate)

            loadExchangeByDate(startDate);
        }
    }, []);


    return (
        <>
            <fieldset className="flex flex-col md:items-end gap-y-2">
                <label htmlFor="start_date" className="text-base text-primary-dark">Wprowadź datę, aby uzyskać wyniki z podanego dnia.</label>
                {error &&
                    <p className="text-warning text-sm">{error}</p>
                }
                <input
                    type="date"
                    id="start_date"
                    min={minDate}
                    max={maxDate}
                    disabled={loading}
                    value={dateParam}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDateChange(e.target.value)}
                    className={`py-3 px-6 border border-primary-light rounded-full block mb-6 max-w-full md:max-w-[375px] transition-all ease-in-out duration-300 focus:border-accent focus:ring-0 focus:shadow-none focus:outline-none w-full text-base text-primary-dark ${error ? 'border-warning' : ''}`}
                    placeholder="Filtruj według daty"
                />
            </fieldset>

            <Icon icon="line-md:loading-loop" width="48" className={`mx-auto text-primary-light ${loading ? 'visible mb-6' : 'invisible h-0'}`} />

            <div className="overflow-x-scroll max-w-full w-full">
                <table className={`app-scrolled-table ${loading ? 'reloading-data' : ''}`}>
                    <thead>
                        <tr>
                            <td>Kod waluty</td>
                            <td>Nazwa waluty</td>
                            {exchangeRatesByDate?.length > 0 &&
                                <td>Kurs z dnia wybranego {formatDate(exchangeRatesByDate[0].startDate)}</td>
                            }
                            <td>Kurs z dnia ({today})</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((data, i) => {
                            const selectedDateRate = exchangeRatesByDate?.find(
                                (rate) => rate.code === data.code
                            );

                            return (
                                <tr key={i}>
                                    <td>{data.code}</td>
                                    <td>{data.currency}</td>
                                    {exchangeRatesByDate?.length > 0 && (
                                        <td>
                                            {selectedDateRate ? (
                                                <>
                                                    <p className="mb-1">
                                                        Kupno:{" "}
                                                        {selectedDateRate.buyPrice === 0
                                                            ? "kantor nie skupuje tej waluty"
                                                            : `${selectedDateRate.buyPrice.toFixed(4)} zł`}
                                                    </p>
                                                    <p>Sprzedaż: {selectedDateRate.sellPrice.toFixed(4)} zł</p>
                                                </>
                                            ) : (
                                                <p>Brak danych</p>
                                            )}
                                        </td>
                                    )}
                                    <td>
                                        <p className="mb-1">Kupno: {data.buyPrice === 0 ? 'kantor nie skupuje tej waluty' : data.buyPrice.toFixed(4) + ' zł'}</p>
                                        <p>Sprzedaż: {data.sellPrice.toFixed(4)} zł</p>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-sm text-secondary text-right pt-8" colSpan={4}>Dane przedstawione w tabeli pochodzą z API Symfony na podstawie danych z NBP</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default ExchangeRatesTable