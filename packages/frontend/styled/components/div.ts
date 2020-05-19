import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const CenterDiv = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const ColumnDiv = styled(Flex)`
  flex-direction: column;
`;

export const JustifyCenterDiv = styled(Flex)`
  justify-content: center;
`;

export const AlignCenterDiv = styled(Flex)`
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;
