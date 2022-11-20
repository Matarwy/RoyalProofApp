/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { Container, DashedCard } from './token-info-highlight.style';

const TokenInfoHighlight: React.FC<{ loading: boolean }> = (props) => {

    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData] = ctx as Array<Token>;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 3

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const formatterToLow = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 8

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });


    useEffect(() => {



    }, []);

    return <Container>

        <DashedCard>
            {
                tokenData?.basicInfo?.currency?.name === undefined && <Spin />
            }
            {
                tokenData?.basicInfo?.currency?.name !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.basicInfo?.currency?.name ? tokenData?.basicInfo?.currency?.name : '-'}
                    </h1>
                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Token Name
                    </span>
                </div>
            }

        </DashedCard>
        <DashedCard>
            {
                tokenData?.basicInfo?.currency?.symbol === undefined && <Spin />
            }
            {
                tokenData?.basicInfo?.currency?.symbol !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.basicInfo?.currency?.symbol ? tokenData?.basicInfo?.currency?.symbol : '-'}
                    </h1>
                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Symbol
                    </span>
                </div>
            }

        </DashedCard>

    </Container>;
};

export default TokenInfoHighlight;

