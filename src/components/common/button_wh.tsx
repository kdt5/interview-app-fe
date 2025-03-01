import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}


function ButtonWhite ({children}: Props) {
    return (
        <>
        <ButtonStyle>
            <p>{children}</p>
        </ButtonStyle>
        </>
    )

}

const ButtonStyle = styled.div<Omit<Props, "children">>`
        background: #FFF;
        color: #6EA1FF;
        border-radius: 10px;
        border: solid 1px #6EA1FF;
        cursor: pointer;

        width: 100%;
        padding: 20px 25px;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        line-height: 1;
        margin-bottom: 7px;

        p{
            color: #6EA1FF;
            font-weight: 600;
        }
`;

export default ButtonWhite