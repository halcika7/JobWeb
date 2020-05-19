import React, { FC } from 'react';
import { AccountRegistrationType } from '../store/types';

import { FiUsers } from 'react-icons/fi';
import { GiBriefcase } from 'react-icons/gi';

import {
  Fieldset,
  Legend,
  FieldsetOptions,
  FieldsetOptionsLi,
  FieldsetButton,
  FieldsetWrap,
} from '../styled';

interface RegisterAccountProps {
  accountType: AccountRegistrationType;
  changeAccount: (value: AccountRegistrationType) => void;
}

const RegisterAccount: FC<RegisterAccountProps> = ({
  accountType,
  changeAccount,
}): JSX.Element => (
  <Fieldset>
    <Legend>Choose your Account Type</Legend>
    <FieldsetOptions>
      <FieldsetOptionsLi active={accountType === 'user'}>
        <FieldsetButton
          type="button"
          className="user"
          onClick={() => changeAccount('user')}
        >
          <FieldsetWrap>
            <div className="icon">
              <FiUsers />
            </div>
            <div className="content">
              <h3>Candidate</h3>
              <p>I want to discover companies.</p>
            </div>
          </FieldsetWrap>
        </FieldsetButton>
      </FieldsetOptionsLi>
      <FieldsetOptionsLi active={accountType === 'company'}>
        <FieldsetButton
          type="button"
          className="company"
          onClick={() => changeAccount('company')}
        >
          <FieldsetWrap>
            <div className="icon">
              <GiBriefcase />
            </div>
            <div className="content">
              <h3>Employer</h3>
              <p>I want to attract the best talent.</p>
            </div>
          </FieldsetWrap>
        </FieldsetButton>
      </FieldsetOptionsLi>
    </FieldsetOptions>
  </Fieldset>
);

export default React.memo(RegisterAccount);
