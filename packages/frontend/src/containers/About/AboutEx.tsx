import React from 'react';

import { ReactComponent as Check } from '@svgs/check.svg';

import {
  AboutExSection,
  AboutExHeading,
  AboutExContent,
  AboutExParagraph,
  Checkboxes,
  Checkbox,
  AboutExIcon,
  CheckboxParagraph,
} from './styled';

import { Row } from '@styled';

const AboutEx = (): JSX.Element => (
  <AboutExSection>
    <Row>
      <AboutExContent className="col-12 col-lg-6">
        <AboutExHeading>How We Do It ?</AboutExHeading>
        <AboutExParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut
          reiciendis fugiat esse labore expedita non quasi et exercitationem
          repellat consequatur perferendis porro quisquam sit quam iusto, earum
          similique dolores, id necessitatibus ipsum tempore. Minima ut sint
          animi quibusdam ipsam. Sint ipsum blanditiis incidunt adipisci ex
          veniam optio quis iste, quod mollitia totam dolorem accusamus nisi
          fuga, suscipit a ad? Est ex qui quia rerum autem. Explicabo
          perspiciatis cumque minima nihil architecto distinctio accusamus,
          saepe laudantium magnam? Et cum voluptas soluta nisi minus recusandae
          adipisci quas eos possimus ullam atque, officia tempore quos. Dolores
          veritatis, eum quae ipsa nesciunt suscipit.
        </AboutExParagraph>
        <AboutExParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          officia commodi nostrum, nemo earum nulla sint nam tenetur architecto
          autem illum incidunt necessitatibus perspiciatis nisi! Excepturi
          vitae, saepe numquam id non nesciunt labore esse sunt quaerat
          obcaecati. Facere natus repellendus eius alias consectetur, esse, id
          tenetur non delectus, cumque at.
        </AboutExParagraph>
        <Checkboxes>
          <Checkbox>
            <AboutExIcon>
              <Check />
            </AboutExIcon>
            <CheckboxParagraph>We sell all over the world.</CheckboxParagraph>
          </Checkbox>
          <Checkbox>
            <AboutExIcon>
              <Check />
            </AboutExIcon>
            <CheckboxParagraph>
              Satisfaction or money refund guaranteed.
            </CheckboxParagraph>
          </Checkbox>
          <Checkbox>
            <AboutExIcon>
              <Check />
            </AboutExIcon>
            <CheckboxParagraph>Lifetime updates & support.</CheckboxParagraph>
          </Checkbox>
        </Checkboxes>
      </AboutExContent>
      <AboutExContent className="col-12 col-lg-6">
        <AboutExHeading>Why We Do It ?</AboutExHeading>
        <AboutExParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ut
          reiciendis fugiat esse labore expedita non quasi et exercitationem
          repellat consequatur perferendis porro quisquam sit quam iusto, earum
          similique dolores, id necessitatibus ipsum tempore. Minima ut sint
          animi quibusdam ipsam. Sint ipsum blanditiis incidunt adipisci ex
          veniam optio quis iste, quod mollitia totam dolorem accusamus nisi
          fuga, suscipit a ad? Est ex qui quia rerum autem. Explicabo
          perspiciatis cumque minima nihil architecto distinctio accusamus,
          saepe laudantium magnam? Et cum voluptas soluta nisi minus recusandae
          adipisci quas eos possimus ullam atque, officia tempore quos. Dolores
          veritatis, eum quae ipsa nesciunt suscipit.
        </AboutExParagraph>
        <AboutExParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          officia commodi nostrum, nemo earum nulla sint nam tenetur architecto
          autem illum incidunt necessitatibus perspiciatis nisi! Excepturi
          vitae, saepe numquam id non nesciunt labore esse sunt quaerat
          obcaecati. Facere natus repellendus eius alias consectetur, esse, id
          tenetur non delectus, cumque at.
        </AboutExParagraph>
      </AboutExContent>
    </Row>
  </AboutExSection>
);

export default AboutEx;
