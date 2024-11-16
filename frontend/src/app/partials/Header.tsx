import Image from "next/image";
import Column from "@/components/grid/Column";
import Container from "@/components/grid/Container";
import Row from "@/components/grid/Row";
import Link from "next/link";

const Header = () => (
    <header className="py-6">
        <Container>
            <Row className="justify-between">
                <Column xl={3} lg={5} md={6}>
                    <Link href={`/`}>
                        <Image
                            src={`/assets/logo.svg`}
                            width={140}
                            height={24}
                            alt="Telemedi - rekrutacja"
                            className="md:mx-0 mx-auto"
                        />
                    </Link>
                </Column>
                <Column xl={9} lg={7} md={6}>
                    <nav className="header-menu">
                        <ul className="flex md:justify-end justify-center md:mt-0 mt-6 gap-x-10">
                            <li>
                                <Link title="Kurs walut" href={`/kurs-walut`}>
                                    Kurs walut
                                </Link>
                            </li>
                            <li>
                                <a title="LinkedIn" target="_blank" href={`https://www.linkedin.com/in/jakub-ociepa-3a7473267/`}>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Column>
            </Row>
        </Container>
    </header>
)

export default Header;