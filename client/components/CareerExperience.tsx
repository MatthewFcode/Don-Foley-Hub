import Nav from './Nav.tsx'

function CareerExperience() {
  return (
    <>
      <Nav />
      <div id="career-experience" className="career-experience-container">
        <div className="experience-header">
          <img src="/images/don-linkedin.jpeg" alt="Don" />
          <h1>Client Delivery Portfolio.</h1>
        </div>
        <section className="experience">
          <div className="role">
            <h3>
              <span>Watercare</span>
              <img src="/images/watercare.jpeg" alt=" watercare " />
            </h3>
            <p className="title">HRIS Transformation Programme Director</p>
            <p className="dates">Mar 2024 – Dec 2025</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Led $21M HRIS programme implementing Workday HCM, Recruitment,
                  Talent, Time Tracking, Learning, and Help.
                </li>
                <li>
                  Integrated MYOB Payroll and SailPoint IDAM with 8 downstream
                  LOB systems.
                </li>
                <li>Oversaw data cleansing and migration.</li>
                <li>Delivered Phase 1 on time and under budget.</li>
                <li>
                  Programme supported Watercare's financial independence under
                  Local Water Done Well.
                </li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>3 Waters – NZ Dept. of Internal Affairs</span>
              <img src="/images/3waters.jpeg" alt="3 waters " />
            </h3>
            <p className="title">
              Programme Lead – Entity A Digital Transformation
            </p>
            <p className="dates">Feb 2023 – Mar 2024</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Led digital delivery for amalgamation of 5 water entities into
                  a new Water Authority.
                </li>
                <li>
                  Managed 5 council teams, EY data team (20), and PwC change
                  team (5).
                </li>
                <li>
                  Migrated systems to Infor ERP, Salesforce, Workday, ArcGIS,
                  and Datacom DataPay.
                </li>
                <li>
                  Reached 75% completion before programme halt following
                  government change.
                </li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Contact Energy</span>
              <img src="/images/contact.png" alt="contact energy" />
            </h3>
            <p className="title">Programme Director (Contract)</p>
            <p className="dates">Sept 2021 – Dec 2022</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Directed $25M SAP S/4HANA transformation programme.</li>
                <li>
                  Managed ERP migrations, 70+ integrations, CRM cloud migration,
                  BI, and SAP Fiori/UI5.
                </li>
                <li>Reported to CIO, CEO, and Board.</li>
                <li>Delivered on time and within contingency.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Auckland Council</span>
              <img
                src="/images/auckland_council_logo.jpeg"
                alt="auckland council"
              />
            </h3>
            <p className="title">Programme Manager – SAP Delivery (Contract)</p>
            <p className="dates">Aug 2019 – Aug 2021</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Oversaw SAP and Agile ERP initiatives including Annual Rates
                  and Auckland Unlimited demerger.
                </li>
                <li>Managed 70+ integrated LOB applications.</li>
                <li>Transitioned 2/3 of ICT to Agile delivery.</li>
                <li>Seconded to MBIE for SAP transformation audit.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>SAP (IBSO) & Auckland Council</span>
              <img src="/images/Sap.png" alt="SAP" />
            </h3>
            <p className="title">
              Project Director – S/4HANA Transformation (Contract)
            </p>
            <p className="dates">Sept 2018 – Aug 2019</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Led S/4HANA transformation team across SAP and Council.</li>
                <li>
                  Managed ~60 staff across NZ, India, Australia, and Europe.
                </li>
                <li>Migrated 70+ integrations and SAP Hybris.</li>
                <li>Delivered ahead of annual rates deadline.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Fonterra</span>
              <img src="/images/Fonterra.png" alt="Fonterra" />
            </h3>
            <p className="title">
              SAP Programme Manager – Supply Planning Optimisation (Contract)
            </p>
            <p className="dates">Mar 2018 – Sept 2018</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Scoped $12M replacement of milk planning optimiser using SAP
                  APO.
                </li>
                <li>
                  Integrated with SAP SCM for nationwide production planning.
                </li>
                <li>Project paused due to restructuring.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Fonterra</span>
              <img src="/images/Fonterra.png" alt="Fonterra" />
            </h3>
            <p className="title">Programme Manager – SAP Ariba (Contract)</p>
            <p className="dates">Mar 2017 – Mar 2018</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Implemented SAP Ariba across 27 NZ sites.</li>
                <li>Integrated with SAP Procurement, FICO, and BW.</li>
                <li>Managed $17M budget and 3,000-user transition.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Air New Zealand</span>
              <img src="/images/airnz.jpeg" alt="Air New Zealand" />
            </h3>
            <p className="title">Programme Lead – DORIS Phase II (Contract)</p>
            <p className="dates">Jun 2015 – Mar 2017</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Replaced crew rostering system for 3,000 staff using Jeppesen.
                </li>
                <li>Managed international Agile delivery teams.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Bank of New Zealand</span>
              <img src="/images/bnz.jpeg" alt="BNZ" />
            </h3>
            <p className="title">
              Programme Lead – Global Plus Credit Card Exit (Contract)
            </p>
            <p className="dates">Jan 2015 – Jun 2015</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Delivered $10M programme to exit Global Plus card.</li>
                <li>Launched Fly Buys-based replacement.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Air New Zealand</span>
              <img src="/images/airnz.jpeg" alt="Air New Zealand" />
            </h3>
            <p className="title">
              Programme Lead – Staff Mobile Programme (Contract)
            </p>
            <p className="dates">Oct 2013 – Dec 2014</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Delivered Air NZ's first staff mobile app.</li>
                <li>Upgraded network, Wi-Fi, firewall, and IDAM.</li>
                <li>Rolled out to 5,000+ staff.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Air New Zealand</span>
              <img src="/images/airnz.jpeg" alt="Air New Zealand" />
            </h3>
            <p className="title">Senior Project Manager – Digital (Contract)</p>
            <p className="dates">Oct 2012 – Sept 2013</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Delivered PCI compliance and LMS upgrades.</li>
                <li>Coordinated desktop refresh for 5,000 staff.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Air New Zealand</span>
              <img src="/images/airnz.jpeg" alt="Air New Zealand" />
            </h3>
            <p className="title">
              Senior Project Manager – Tiakina Programme (Contract)
            </p>
            <p className="dates">Feb 2011 – Oct 2012</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Led SAP maintenance, Peoplesoft HR, VMware, and Oracle DB
                  migrations.
                </li>
                <li>Migrated entire Air NZ digital landscape.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Perpetual Insurance</span>
              {/* <img src="" alt="" /> */}
            </h3>
            <p className="title">Technology Project Manager (Contract)</p>
            <p className="dates">Sept 2010 – Jan 2011</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Delivered $3M infrastructure separation from ASB Bank.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>ANZ Bank NZ</span>
              <img src="/images/anz.webp" alt="ANZ" />
            </h3>
            <p className="title">Tech Project Manager (Contract)</p>
            <p className="dates">May 2010 – Sept 2010</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>
                  Scoped $20M ICT delivery within $100M trading floor programme.
                </li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>BNZ (NAB Group)</span>
              <img src="/images/bnz.jpeg" alt="BNZ" />
            </h3>
            <p className="title">National Retail Refit Programme Manager</p>
            <p className="dates">Dec 2009 – May 2010</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Led $80M retail refit ICT stream.</li>
                <li>Managed 11 technology projects.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>BNZ (NAB Group)</span>
              <img src="/images/bnz.jpeg" alt="BNZ" />
            </h3>
            <p className="title">Head of Software & Delivery</p>
            <p className="dates">May 2009 – Dec 2009</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Established BI and data warehousing services.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>BNZ (NAB Group)</span>
              <img src="/images/bnz.jpeg" alt="BNZ" />
            </h3>
            <p className="title">IT Delivery Manager</p>
            <p className="dates">Jun 2008 – May 2009</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Managed online banking, ATMs, and data centre upgrades.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>GlaxoSmithKline – Consumer Health UK</span>
              <img src="/images/glaxo.jpeg" alt="GlaxoSmithKline" />
            </h3>
            <p className="title">IT Services Director</p>
            <p className="dates">Oct 2007 – May 2008</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Led IT strategy for £900m revenue business.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>GlaxoSmithKline – Europe Pharma</span>
              <img src="/images/glaxo.jpeg" alt="GlaxoSmithKline" />
            </h3>
            <p className="title">Infrastructure Delivery Manager</p>
            <p className="dates">Mar 2004 – Sept 2007</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Oversaw infrastructure delivery across 44 countries.</li>
                <li>Led major TOP-IT transformation programme.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Business Objects (SAP)</span>
              <img src="/images/Sap.png" alt="SAP" />
            </h3>
            <p className="title">Customer Loyalty Manager</p>
            <p className="dates">Jan 2001 – Mar 2004</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Managed enterprise customers across Europe and Africa.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>Business Objects (SAP)</span>
              <img src="/images/Sap.png" alt="SAP" />
            </h3>
            <p className="title">Technical Support Manager</p>
            <p className="dates">Nov 1999 – Jan 2001</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Led multilingual European support teams.</li>
              </ul>
            </details>
          </div>

          <div className="role">
            <h3>
              <span>MRO.com (IBM Maximo)</span>
              <img src="/images/IBM.svg" alt="Maximo" />
            </h3>
            <p className="title">Senior Technical Support Analyst</p>
            <p className="dates">Jun 1998 – Oct 1999</p>
            <details>
              <summary>View details</summary>
              <ul>
                <li>Provided multilingual ERP 3rd-level support.</li>
                <li>Promoted to team lead.</li>
              </ul>
            </details>
          </div>
        </section>
      </div>
      <div className="scroll-indicator">
        <p className="scroll-text">Scroll Down</p>
        <div className="arrows">
          <div className="arrow"></div>
          <div className="arrow"></div>
          <div className="arrow"></div>
        </div>
      </div>
    </>
  )
}

export default CareerExperience
