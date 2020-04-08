import { ReactComponent as Check } from 'assets/svgs/check.svg';
import React from 'react';

const AboutEx = (): JSX.Element => (
  <section className="about-ex">
    <div className="row">
      <div className="col-12 col-lg-6">
        <h3>How We Do It ?</h3>
        <p>
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
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          officia commodi nostrum, nemo earum nulla sint nam tenetur architecto
          autem illum incidunt necessitatibus perspiciatis nisi! Excepturi
          vitae, saepe numquam id non nesciunt labore esse sunt quaerat
          obcaecati. Facere natus repellendus eius alias consectetur, esse, id
          tenetur non delectus, cumque at.
        </p>
        <div className="checkboxes">
          <div className="checkbox">
            <div className="icon">
              <Check />
            </div>
            <p>We sell all over the world.</p>
          </div>
          <div className="checkbox">
            <div className="icon">
              <Check />
            </div>
            <p>Satisfaction or money refund guaranteed.</p>
          </div>
          <div className="checkbox">
            <div className="icon">
              <Check />
            </div>
            <p>Lifetime updates & support.</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <h3>Why We Do It ?</h3>
        <p>
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
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          officia commodi nostrum, nemo earum nulla sint nam tenetur architecto
          autem illum incidunt necessitatibus perspiciatis nisi! Excepturi
          vitae, saepe numquam id non nesciunt labore esse sunt quaerat
          obcaecati. Facere natus repellendus eius alias consectetur, esse, id
          tenetur non delectus, cumque at.
        </p>
      </div>
    </div>
  </section>
);

export default AboutEx;
