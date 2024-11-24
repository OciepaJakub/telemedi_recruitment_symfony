import React from 'react';
import Column from '../components/grid/Column';
import Container from '../components/grid/Container';
import Row from '../components/grid/Row';

const Home: React.FC = () => {
    return (
        <div>
            <section id="entry-section">
                <Container>
                    <Row>
                        <Column xl={4} lg={5} md={6} className="flex flex-col">
                            <h1 className="text-3xl text-primary mt-10 mb-6 font-bold tracking-wide">Zadanie rekrutacyjne</h1>
                            <p className="text-primary-dark">Bardzo dziękuje za poświęcony czas.</p>
                            <p className="text-primary-dark mt-3">W menu znajdują się linki do mojego profilu na LinkedIn oraz części głównej aplikacji, tablicy z kursami walut.</p>
                            <p className="mt-auto text-secondary-dark font-bold">Listopad 2024 - Ociepa Jakub</p>
                        </Column>
                        <Column xl={7} lg={7} md={6} className="md:mb-0 mb-8">
                            <h2 className="text-3xl text-primary mt-10 mb-6 font-bold tracking-wide">Kolory dostępne w UI</h2>
                            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                                <div className="aspect-square bg-primary">
                                    <p className="p-3 font-bold text-sm tracking-wider">Primary</p>
                                </div>
                                <div className="aspect-square bg-primary-light">
                                    <p className="p-3 font-bold text-sm tracking-wider">Primary Light</p>
                                </div>
                                <div className="aspect-square bg-primary-dark">
                                    <p className="p-3 font-bold text-sm tracking-wider">Primary Dark</p>
                                </div>

                                <div className="aspect-square bg-accent">
                                    <p className="p-3 font-bold text-sm tracking-wider">Accent</p>
                                </div>
                                <div className="aspect-square bg-accent-light">
                                    <p className="p-3 font-bold text-sm tracking-wider">Accent Light</p>
                                </div>
                                <div className="aspect-square bg-accent-dark">
                                    <p className="p-3 font-bold text-sm tracking-wider">Accent Dark</p>
                                </div>

                                <div className="aspect-square bg-secondary">
                                    <p className="p-3 font-bold text-sm tracking-wider">Secondary</p>
                                </div>
                                <div className="aspect-square bg-secondary-light">
                                    <p className="p-3 font-bold text-sm tracking-wider">Secondary Light</p>
                                </div>
                                <div className="aspect-square bg-secondary-dark">
                                    <p className="p-3 font-bold text-sm tracking-wider">Secondary Dark</p>
                                </div>

                                <div className="aspect-square bg-background border-2 border-secondary-dark">
                                    <p className="p-3 font-bold text-sm tracking-wider">Background</p>
                                </div>

                                <div className="aspect-square bg-warning">
                                    <p className="p-3 font-bold text-sm tracking-wider">Warning</p>
                                </div>

                                <div className="aspect-square bg-success">
                                    <p className="p-3 font-bold text-sm tracking-wider">Success</p>
                                </div>
                            </div>
                        </Column>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
