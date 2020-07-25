import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 25px;
  width: 100%;
  max-width: 1080px;
  flex: 1;

  padding: 24px 0;

  margin: 0 auto;
`;

export const OverflowBonusHeight = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  overflow: hidden;
`;

export const BonusList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100vw;

  overflow: hidden;
`;

export const BonusListContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transform-origin: left top;
  transform: rotateZ(-90deg) translateX(-100%);

  overflow: auto;

  scroll-snap-type: y mandatory;
  scroll-snap-type-y: mandatory;
  scroll-snap-type: mandatory;

  -webkit-overflow-scrolling: touch;

  width: 150px;
  height: 100vw;
  max-height: 1080px;

  > div {
    transform: rotateZ(90deg);

    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    display: none;
    width: 5px;
    position: absolute;
  }
`;

export const BonusCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex-shrink: 0;

  width: 250px;
  height: 250px;
  margin: 10px;
  /* margin-bottom: 170px; */
  /* margin-top: 90px; */
`;

export const TheCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #ffffff30;

  padding: 18px;
  border-radius: 12px;
  height: 130px;

  color: var(--oliveBlue);

  > a {
    display: flex;
    place-items: center;

    > svg {
      margin-right: 8px;
    }
  }
`;
