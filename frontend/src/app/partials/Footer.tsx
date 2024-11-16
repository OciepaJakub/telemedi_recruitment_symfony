import Column from "@/components/grid/Column";
import Row from "@/components/grid/Row";
import Container from "@/components/grid/Container";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => (
    <footer className="md:py-12 py-6 bg-primary-light/30">
        <Container>
            <Row className="justify-between">
                <Column xl={4} lg={5} md={6} className="md:mb-0 mb-6">
                    <p className="text-sm text-primary-dark">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem deserunt nam aliquam recusandae praesentium et excepturi magnam aperiam, illum numquam laudantium placeat explicabo qui exercitationem enim officiis quae tempore. Recusandae.</p>
                </Column>
                <Column xl={4} lg={5} md={6}>
                    <p className="text-lg text-primary-dark font-bold md:text-right mb-1 tracking-wide">Lorem ipsum dolor sit.</p>
                    <p className="text-sm text-primary-dark md:text-right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim repellendus, pariatur modi doloremque minima veritatis.</p>
                    <div className="flex gap-x-6 md:justify-end mt-6 text-primary-dark">
                        <a href="#" className="block transition-colors ease-in-out duration-300 hover:text-primary-light" title="Facebook">
                            <Icon icon="ic:outline-facebook" width="32" />
                        </a>
                        <a href="#" className="block transition-colors ease-in-out duration-300 hover:text-primary-light" title="Instagram">
                            <Icon icon="mdi:instagram" width="32" />
                        </a>
                        <a href="#" className="block transition-colors ease-in-out duration-300 hover:text-primary-light" title="Medical">
                            <Icon icon="ion:medical" width="32" />
                        </a>
                    </div>
                </Column>
            </Row>
        </Container>
    </footer>
)

export default Footer;