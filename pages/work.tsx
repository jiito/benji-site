import { Layout } from '../components/Layout'

const WorkPage = () => {
    return (
        <Layout>
            <h3>prev: </h3>
            <div className="work-experience ">
                <div>
                    <a href="https://crossmint.io">
                        <h5> Crossmint </h5>
                    </a>
                    <span className="tagline">The fastest way to buy NFTs</span>
                    <ul>
                        <li>
                            <a href="https://github.com/Crossmint/solana-auth">
                                Solana Auth
                            </a>
                        </li>
                        <li>WalletConnect Adapter</li>
                    </ul>
                </div>
                <div>
                    <a href="https://pallet.com">
                        <h5> Pallet </h5>
                    </a>
                    <span className="tagline">
                        Unlocking Talent In Internet Communities
                    </span>
                </div>
                <div>
                    <a href="https://pallet.com">
                        <h5> The Jackson Laboratory </h5>
                    </a>
                    <span className="tagline">Biomedical research</span>
                    <ul>
                        <li> Paper: tRNA synthetase genes in DO mice. </li>
                    </ul>
                </div>
                <div>
                    <a href="https://pallet.com">
                        <h5> Product Buds </h5>
                    </a>
                    <span className="tagline">
                        The largest community of aspiring product managers
                    </span>
                </div>
            </div>
        </Layout>
    )
}
export default WorkPage
