// Dependencies
import React, { useEffect } from 'react';
import { Container } from './official-partners.style';
// import icoListing from '../../../../assets/ads/icoListing.png'
const OfficialPartners: React.FC<{ title?: string }> = (props) => {
    useEffect(() => { }, []);

    return <Container>
        {/* {
            props.title && props.title
        }
        {
            !props.title && ' Official Security Partners of'
        }
        <a href='https://icolisting.live' target={'__blank'}><img width={100} src={icoListing} alt="" /></a> */}

    </Container>;
};

export default OfficialPartners;

