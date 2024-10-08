/* eslint-disable react-hooks/exhaustive-deps */
// Dependencies
import { Tag } from 'antd';
import React, { useContext } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { Container } from './token-main-card-header.style';

const TokenMainCardHeaderComponent: React.FC<{ info: Token }> = (props) => {
    const { ctx } = useContext(ApplicationContext) as any;

    const [tokenData] = ctx;

    return <Container>
        {
            tokenData?.basicInfo?.KYC &&
            <Tag color="purple">
                KYC
            </Tag>
        }
        <div className="text-container">
            <span className='fw-bolder mb-1 fs-1 text-dark name'>{props?.info?.basicInfo?.currency?.name ? props?.info?.basicInfo?.currency?.name : ''}</span>
        </div>
    </Container>;
};

export default TokenMainCardHeaderComponent;

