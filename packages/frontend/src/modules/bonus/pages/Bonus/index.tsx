import React, { useState, useEffect } from 'react';

import DefaultLayout from '@globalComponents/_Layout/Default';
import { Link } from 'react-router-dom';
import { FiVideo } from 'react-icons/fi';

import api from '@shared/services/api';

import VideoPlayer from '@globalComponents/VideoPlayer';
import {
  Container,
  OverflowBonusHeight,
  BonusList,
  BonusListContent,
  BonusCard,
  TheCard,
} from './styles';

interface BonusProps {
  id: string;
  name: string;
  duration: string;
  bonusVideo: string;
}

const Bonus: React.FC = () => {
  const [bonusList, setBonusList] = useState([] as BonusProps[]);

  useEffect(() => {
    api.get(`bonus`).then(response => {
      setBonusList(response.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <header>
          <h2>Bem vindo! Confira seus bônus</h2>
        </header>
        <OverflowBonusHeight>
          <BonusList>
            <BonusListContent>
              {bonusList.map(bonus => (
                <BonusCard key={bonus.id}>
                  <TheCard>
                    <header>
                      <h3>{bonus.name}</h3>
                      <small>Duração: {bonus.duration}</small>
                    </header>
                    <Link to="/bonus/1">
                      <FiVideo /> Assistir
                    </Link>
                  </TheCard>
                </BonusCard>
              ))}
            </BonusListContent>
          </BonusList>
        </OverflowBonusHeight>

        <VideoPlayer />
      </Container>
    </DefaultLayout>
  );
};

export default Bonus;
