import React from "react";

/**
 * Handles the about page, which is also
 * used at the landing page for this project.
 */
function AboutUs() {
  return (
    <div className="mx-60">
      <article>
        <section className="p-4">
          <h2 className="text-lg font-bold">About this Project</h2>
          <p className="mb-4 -tracking-tighter">
            This is a protfolio project, which the below Authors were tasked
            after during their ALX Africa Software Engineering Course.
          </p>

          <p className="mb-4  -tracking-tighter">
            It was few days to the end of the month of May, 2024 when a group of
            three ALX Sodtware Engineering Learners came together for a single
            purpose of discussing about various problems and how technology can
            be used to solve at least one of the problems.
          </p>

          <p className="mb-4  -tracking-tighter">
            Having discussed several problems, but the one that stood out to
            them happened to be that of a working, but nursing mother whose
            major challenge happened to be visiting a grocery store and ending
            up spending more time in traffic and facing a long queue at the
            checkout point of the store.
          </p>

          <p className=" -tracking-tighter">
            Another problem, which we through technology attempt to solve is
            that of a business or a set of businesses whose sales' channels are
            only available to walk-in customers.
          </p>

          <p className="py-2  -tracking-tighter">
            With this project, named theCart, we intend on:
          </p>

          <li className=" -tracking-tighter">
            taking away the need for anyone to have to visit a business
            in-person for shopping purposes,
          </li>
          <li className=" -tracking-tighter">
            increasing a customer-base of a business that only serves a walk-in
            customers.
          </li>
        </section>

        <section className="p-4">
          <h2 className="text-lg font-bold mt-10">theCart</h2>

          <p className="py-2 -tracking-tighter">
            It is an e-commerce management application that simplifies the
            process flow of checking a product out and placing an order for it.
          </p>

          <p className="py-2 -tracking-tighter">
            The process flow is:
            <li>Peruse a list of products</li>
            <li>View a product's detail</li>
            <li>Specify a quantity for a product</li>
            <li>Add it to cart</li>
            <li>Place an order</li>
            <li>Lastly, check out</li>
          </p>
        </section>

        <section className="p-4">
          <h2 className="text-lg font-bold mt-10 mb-4">Authors</h2>

          <h3 className="font-bold text-md text-blue-500">
            <a
              href="https://www.linkedin.com/in/debaycisse/"
              className="underline"
            >
              Azeez Adebayo
            </a>
          </h3>
          <p className="mb-4 -tracking-tighter">
            He is a backend enginneering learner. He worked as a frontend
            engineer for the project.
          </p>
          <h3 className="font-bold text-md text-blue-500">
            <a
              href="https://www.linkedin.com/in/mathewkoech/"
              className="underline"
            >
              Mathew Koech
            </a>
          </h3>
          <p className="mb-4 -tracking-tighter">
            He worked as a backend enginer for the project. He is versed in
            Django framework.
          </p>
          <h3 className="font-bold text-md text-blue-500">
            <a
              href="https://www.linkedin.com/in/justus-ndegwa-316798286/"
              className="underline"
            >
              Justus Ndegwa
            </a>
          </h3>
          <p className="mb-4 -tracking-tighter">
            He assisted in several ways to see the project complete. He is a
            frontend engineering learner.
          </p>
        </section>
      </article>
    </div>
  );
}

export default AboutUs;
