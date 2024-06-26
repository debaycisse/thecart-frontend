import React from 'react';

function FAQ() {
  return (
    <div className="container mt-5">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                What is your return policy?
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#faqAccordion">
            <div className="card-body">
              Our return policy lasts 30 days...
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How do I track my order?
              </button>
            </h5>
          </div>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#faqAccordion">
            <div className="card-body">
              You can track your order by...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;