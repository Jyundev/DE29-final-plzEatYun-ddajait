import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';



function JoinHead() {

    const [RowData, setRowData] = useState([]);

    const { challengeId } = useParams();

    const Challenge = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://52.78.44.47/api/v1/challenge/detail/${challengeId}`);
            setRowData(data.data);
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        }
    }, [challengeId])

    useEffect(() => {
        Challenge();
    }, [Challenge]);

    console.log(RowData)

    return (
        <Wrapper>
            <Title>
                <MainTitle>
                    {RowData.challengeName} 챌린지
                </MainTitle>
                <SubTitle>
                    <div>기간: {RowData.startDay} - {RowData.endDay}</div>
                    <div>시험일: {RowData.testDay}</div>
                    <div>함께 하는 이들: {}명</div>
                </SubTitle>
            </Title>
        </Wrapper>
    )
}

export default JoinHead

const Wrapper = styled.div`
    width: 100%;
    height: 350px;
    background: #c0392b;
    background: -webkit-linear-gradient(to right, #8e44ad, #c0392b);
    background: linear-gradient(to right, #8e44ad, #c0392b);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    font-weight: 600;
    color: #fffffff8;
    gap: 70px;
`;

const MainTitle = styled.div`
    font-size: 70px;
`;

const SubTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 600;
    gap: 8px;
    color: #fffffff8;
`;