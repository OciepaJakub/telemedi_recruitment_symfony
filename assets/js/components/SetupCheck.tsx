import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SetupCheckState {
    setupCheck: boolean | null;
    loading: boolean;
}

const SetupCheck: React.FC = () => {
    const [state, setState] = useState<SetupCheckState>({
        setupCheck: null,
        loading: true,
    });

    const BASE_URL = 'http://telemedi_recruitment_symfony.test';

    const checkApiSetup = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/setup-check?testParam=1`, {
                headers: {
                    'X-API-KEY': '2Ii3oFObje5m8208nDygIVJh0pSn3eq4ay5dDuRHl5A0ETLJ6r',
                },
            });

            const responseIsOK = response.data && response.data.testParam === 1;
            setState({ setupCheck: responseIsOK, loading: false });
        } catch (error) {
            console.error(error);
            setState({ setupCheck: false, loading: false });
        }
    };

    useEffect(() => {
        checkApiSetup();
    }, []);

    const { loading, setupCheck } = state;

    return (
        <div>
            <section className="row-section">
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-8 offset-md-2">
                            <h2 className="text-center">
                                <span>This is a test</span> @ Telemedi
                            </h2>

                            {loading ? (
                                <div className="text-center">
                                    <span className="fa fa-spin fa-spinner fa-4x"></span>
                                </div>
                            ) : (
                                <div className="text-center">
                                    {setupCheck ? (
                                        <h3 className="text-success text-bold">
                                            <strong>React app works!</strong>
                                        </h3>
                                    ) : (
                                        <h3 className="text-error text-bold">
                                            <strong>React app doesn't work :(</strong>
                                        </h3>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SetupCheck;

