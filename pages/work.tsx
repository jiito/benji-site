import { Layout } from '../components/Layout'

const WorkPage = () => {
    return (
        <Layout>
            <div className="main">
                <div className="construction">
                    🚧 This page is currently under construction 🚧
                </div>

                <div>
                    <h3>prev: </h3>
                </div>
                <div>
                    <a href="https://crossmint.io">
                        <h5> Crossmint </h5>
                    </a>
                    <span>The fastest way to buy NFTs</span>
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
                </div>
            </div>
        </Layout>
    )
}
export default WorkPage
