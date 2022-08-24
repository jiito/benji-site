import Image from "next/image"
import { Layout } from "../components/Layout"
const ArtPage = () => {


    return (
        <Layout>
            <div>
                <div className="construction" >
                    🚧 <em><strong>ROAD WORK AHEAD:</strong></em> This page is currently under construction 🚧
                </div>
                <Image
                    src="/blue_balls.png"
                    height={500}
                    width={500}
                />
            </div>
        </Layout>
    )

}
export default ArtPage
