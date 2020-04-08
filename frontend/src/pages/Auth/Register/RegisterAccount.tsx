import React, { FC } from 'react';
import { FiUsers } from 'react-icons/fi';
import { GiBriefcase } from 'react-icons/gi';
import { AccountRegistrationType } from './IRegister';

interface RegisterAccountProps {
  accountType: AccountRegistrationType;
  changeAccount: (value: AccountRegistrationType) => void;
}

const RegisterAccount: FC<RegisterAccountProps> = ({
  accountType,
  changeAccount,
}): JSX.Element => (
  <fieldset>
    <legend>Choose your Account Type</legend>
    <ul className="options">
      <li className={accountType === 'user' ? 'active' : ''}>
        <button type="button" onClick={() => changeAccount('user')}>
          <div className="wrap">
            <div className="icon">
              <FiUsers />
            </div>
            <div className="content">
              <h3>Candidate</h3>
              <p>I want to discover companies.</p>
            </div>
          </div>
        </button>
      </li>
      <li className={accountType === 'company' ? 'active' : ''}>
        <button type="button" onClick={() => changeAccount('company')}>
          <div className="wrap">
            <div className="icon">
              <GiBriefcase />
            </div>
            <div className="content">
              <h3>Employer</h3>
              <p>I want to attract the best talent.</p>
            </div>
          </div>
        </button>
      </li>
    </ul>
  </fieldset>
);

export default React.memo(RegisterAccount);
