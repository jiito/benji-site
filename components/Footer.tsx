import styled from "styled-components"

const Footer = () => {
    return (<CenteredDiv>
        <p>This site was build with Next.js. You can view the source code <a href="https://github.com/jiito/benji-site">here</a> </p>
    </CenteredDiv>)
}
export default Footer


const CenteredDiv = styled.div`
    margin: auto
`
