
const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

const IndicatorList = [
  {
    "SDG-MMCode": "MM-1.1.A",
    "Indicator name": "Proportion of population below international poverty line disaggregated by sex, age group and location (UNDP-modelled)"
  },
  {
    "SDG-MMCode": "MM-1.2.A",
    "Indicator name": "Proportion of population living below national poverty line, disaggregated by sex and age group (UNDP modelled)"
  },
  {
    "SDG-MMCode": "MM-1.2.B",
    "Indicator name": "Percentage of households reporting income reduction compared to one year before, as (a) total, (b) up to 25% reduction, (c) from 25 to 50% reduction; (d) from 50 to 75% reduction; (e) over 75% reduction."
  },
  {
    "SDG-MMCode": "MM-1.2.C",
    "Indicator name": "Percentage of households relying on external assistance (donations) as a primary source of income."
  },
  {
    "SDG-MMCode": "MM-1.2.D",
    "Indicator name": "Percentage of households adopting (a) crisis or emergency livelihood coping strategies, (b) crisis strategy; (c) emergency strategy, based on the Livelihood Coping Strategy Index."
  },
  {
    "SDG-MMCode": "MM-1.3.A",
    "Indicator name": "Proportion of population covered by social protection floors/systems, by sex, (a) any population covered by at least one social protection benefit, (b) children/household receiving child/family cash benefits, (c) unemployed persons, (d) persons above retirement age receiving a pension, (e) persons with disabilities, (f) pregnant women & newborns, (g) work-injury victims, and (h) the poor and the vulnerable"
  },
  {
    "SDG-MMCode": "MM-1.3.B",
    "Indicator name": "Number of households receiving non-government support as cash transfers, as (a) total; (b) relief cash transfers (unconditional); (c) productivity (asset creation) cash transfers (conditional), by sex, age and migration status of recipient."
  },
  {
    "SDG-MMCode": "MM-1.4.A",
    "Indicator name": "Percentage of women who report facing challenges to access basic services, for (a) education opportunities, (b) clean water and sanitation, (c) healthcare services, (d) protection services (including police) and legal assistance, and (e) financial services."
  },
  {
    "SDG-MMCode": "MM-1.4.B",
    "Indicator name": "Proportion of total adult population with secure tenure rights to land, with (a) legally recognized documentation and (b) who perceive their rights to land as secure, by sex and by type of tenure"
  },
  {
    "SDG-MMCode": "MM-1.5.A",
    "Indicator name": "Number of (a) deaths and missing persons, and (b) directly affected people attributed to disasters per 100,000 people"
  },
  {
    "SDG-MMCode": "MM-1.5.C",
    "Indicator name": "Number of new forced internal displacements due to disasters, by sex, age, state/region"
  },
  {
    "SDG-MMCode": "MM-1.a.A",
    "Indicator name": "Total official development assistance (ODA) grants from all donors that focus on poverty reduction as a share of the recipient country’s gross national income"
  },
  {
    "SDG-MMCode": "MM-1.a.B",
    "Indicator name": "Spending on essential services as (a) total, (b) education, (c) health and (d) social protection, as % of total government spending"
  },
  {
    "SDG-MMCode": false,
    "Indicator name": false
  },
  {
    "SDG-MMCode": "MM-1.a.C",
    "Indicator name": "Total government expenditures on social services as % of GDP for (a) total; (b) social protection; (b) health, (c) education."
  },
  {
    "SDG-MMCode": "MM-2.1.A",
    "Indicator name": "Percentage of people with (a) insufficient food consumtion, broken down as (b) poor food consumption; (c) borderline food consumption, using the Food Consumption Score."
  },
  {
    "SDG-MMCode": "MM-2.1.B",
    "Indicator name": "Prevalence of food insecurity in the population as (a) total, (b) moderate, (c) severe, based on the Food Insecurity Experience Scale (FIES)"
  },
  {
    "SDG-MMCode": "MM-2.1.C",
    "Indicator name": "Number of vulnerable and at-risk households and population receiving non-governmental support for food (in-kind and food vouchers), by migration status"
  },
  {
    "SDG-MMCode": "MM-2.1.D",
    "Indicator name": "Percentage of households reducing their food intake due to household income reduction"
  },
  {
    "SDG-MMCode": "MM-2.2.A",
    "Indicator name": "Prevalence of wasting among children under 5 years of age by MUAC measurement as (a) moderate acute malnutrition (MUAC=[115-125 mm]), and (b) severe acute malnutrition (MUAC<115 mm)."
  },
  {
    "SDG-MMCode": "MM-2.2.B",
    "Indicator name": "Proportion of children 6–23 months of age who receive a minimum acceptable diet as (a) total; (b) breastfed children; (c) non-breastfed children."
  },
  {
    "SDG-MMCode": "MM-2.2.C",
    "Indicator name": "Prevalence of exclusive breastfeeding among children under 6 months"
  },
  {
    "SDG-MMCode": "MM-2.2.D",
    "Indicator name": "Number of children (6-59 months) with (a) severe acute malnutrition (SAM) admitted in out-patient therapeutic feeding programmes; (b) reached with multiple micro-nutrient powder through non-governmental support."
  },
  {
    "SDG-MMCode": "MM-2.2.E",
    "Indicator name": "Number of pregnant and lactating women admitted for (a) blanket supplementary feeding; (b) targeted supplementary feeding, in non-governmental feeding programmes."
  },
  {
    "SDG-MMCode": "MM-2.3.A",
    "Indicator name": "Agricultural productivity by labour unit [agricultural value added at constant 2015 $/employed person in agriculture sector]"
  },
  {
    "SDG-MMCode": "MM-2.3.B",
    "Indicator name": "Agricultural productivity by land unit [agricultural GDP at constant 2015$/harvested area in ha]"
  },
  {
    "SDG-MMCode": "MM-2.3.C",
    "Indicator name": "Gross Production Index Numbers for (a) crops; (b) livestock products; (c) fishery products; as (i) total; (ii) per capita (base 2014-2016 = 100)."
  },
  {
    "SDG-MMCode": "MM-2.3.D",
    "Indicator name": "Percentage of farming households reporting (a) reduced crop production; (b) livestock herd size, compared to a previous year."
  },
  {
    "SDG-MMCode": "MM-2.4.A",
    "Indicator name": "Proportion of irrigated farmland out of total agricultural land"
  },
  {
    "SDG-MMCode": "MM-2.c.A",
    "Indicator name": "Indicator of food price anomalies, by Consumer Food Price Index"
  },
  {
    "SDG-MMCode": "MM-3.1.A",
    "Indicator name": "Maternal mortality ratio per 100,000 live births"
  },
  {
    "SDG-MMCode": "MM-3.2.A",
    "Indicator name": "Under-5 mortality rate"
  },
  {
    "SDG-MMCode": "MM-3.2.B",
    "Indicator name": "Neonatal mortality rate"
  },
  {
    "SDG-MMCode": "MM-3.3.A",
    "Indicator name": "Number of new HIV infections per 1,000 uninfected population, by sex, age and key populations"
  },
  {
    "SDG-MMCode": "MM-3.3.B",
    "Indicator name": "Tuberculosis incidence per 100,000 population"
  },
  {
    "SDG-MMCode": "MM-3.3.C",
    "Indicator name": "Malaria incidence per 1,000 population"
  },
  {
    "SDG-MMCode": "MM-3.3.D",
    "Indicator name": "Hepatitis B incidence per 100,000 population"
  },
  {
    "SDG-MMCode": "MM-3.4.A",
    "Indicator name": "Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease"
  },
  {
    "SDG-MMCode": "MM-3.4.B",
    "Indicator name": "Suicide mortality rate"
  },
  {
    "SDG-MMCode": "MM-3.7.A",
    "Indicator name": "Proportion of women of reproductive age (aged 15–49 years) who have their need for family planning satisfied with modern methods"
  },
  {
    "SDG-MMCode": "MM-3.7.B",
    "Indicator name": "Contraceptive prevalence rate (any method), women 15-49 as (a) all women; (b) currently married women"
  },
  {
    "SDG-MMCode": "MM-3.7.D",
    "Indicator name": "Number of youth (18-24) reached with awareness-raising on COVID-19 as well as SRHR, GBV and MHPSS through mobile applications"
  },
  {
    "SDG-MMCode": "MM-3.8.A",
    "Indicator name": "Percentage of townships that provide healthcare services for (a) EPI; (b) HIV-AIDS treatment; (c) tuberculosis; (d) malaria; (e) reproductive, maternal, neonatal, child and adolescent health; (f) non-communicable diseases; and (g) all of listed medical services."
  },
  {
    "SDG-MMCode": "MM-3.8.B",
    "Indicator name": "Proportion of households reducing expenditures on health in the past XX months due to household income reduction."
  },
  {
    "SDG-MMCode": "MM-3.8.C",
    "Indicator name": "Percentage of women reporting that access to health services is (a) easier, (b) same; (c) more difficult than 12 months before"
  },
  {
    "SDG-MMCode": "MM-3.c.A",
    "Indicator name": "Health worker density and distribution as (a) total, (b) dentists, (c) nurses & midwives, (d) pharmacists, (e) physician."
  },
  {
    "SDG-MMCode": "MM-3.d.A",
    "Indicator name": "International Health Regulations (IHR) capacity and health emergency preparedness"
  },
  {
    "SDG-MMCode": "MM-3.d.B",
    "Indicator name": "Percentage of bloodstream infections due to selected antimicrobial-resistant organisms, for (a) Escherichia coli; (b) methicillin-resistant Staphylococcus aureus"
  },
  {
    "SDG-MMCode": "MM-4.1.A",
    "Indicator name": "Completion rate: (a) primary education, (b) lower secondary education, (c) upper secondary education (UNESCO-modelled)."
  },
  {
    "SDG-MMCode": "MM-4.1.B",
    "Indicator name": "Gross enrolment rates for basic education for (a) primary school; (b) lower secondary school; (c) higher secondary school"
  },
  {
    "SDG-MMCode": "MM-4.1.C",
    "Indicator name": "School drop-out rate for  children of (a) primary school age; (b) secondary school age."
  },
  {
    "SDG-MMCode": "MM-4.1.D",
    "Indicator name": "Number of weeks of school closures due to external factors"
  },
  {
    "SDG-MMCode": "MM-4.2.A",
    "Indicator name": "Percentage of children under 5 who attend preschool"
  },
  {
    "SDG-MMCode": "MM-4.3.B",
    "Indicator name": "Gross enrolment ratio for tertiary education by sex"
  },
  {
    "SDG-MMCode": "MM-4.3.C",
    "Indicator name": "Participation rate in technical-vocational programmes (15- to 24-year-old) by sex"
  },
  {
    "SDG-MMCode": "MM-4.4.A",
    "Indicator name": "Educational attainment rates by age group and level of education or higher: (a) primary, (b) lower secondary, (c) upper secondary, (d) post-secondary non-tertiary, (e) short-cycle tertiary, (f) bachelor's degree, (g) Master's degreed, (h) Doctoral degree."
  },
  {
    "SDG-MMCode": "MM-4.5.A",
    "Indicator name": "Parity indices (female/male, rural/urban, bottom/top wealth quintile and others such as disability status, indigenous peoples and conflict-affected, as data become available) for selected education indicators (4.1.A, 4.1.C, 4.2.A, 4.3.C, 4.4.A)"
  },
  {
    "SDG-MMCode": "MM-4.5.C",
    "Indicator name": "Education expenditure per student in % of GDP per capita and in constant PPP$, for (a) all basic education levels; (b) primary, (c) lower secondary, (d) upper secondary"
  },
  {
    "SDG-MMCode": "MM-4.a.A",
    "Indicator name": "Proportion of schools offering (a) basic drinking water, (b) single-sex sanitation facilities; and (c) basic sanitation facilities, by level of education (i) primary, (ii) lower secondary; (iii) upper secondary."
  },
  {
    "SDG-MMCode": "MM-4.a.B",
    "Indicator name": "Number of attacks on students, personnel and institutions"
  },
  {
    "SDG-MMCode": "MM-4.c.A",
    "Indicator name": "Student / Teacher ratio for (a) primary education; (b) lower secondary education; (c) higher secondary education"
  },
  {
    "SDG-MMCode": "MM-5.2.A",
    "Indicator name": "Percentage of women reporting feeling safe going out (a) during the day and (b) during the night (i) in their ward/village; (ii) outside of their ward/village."
  },
  {
    "SDG-MMCode": "MM-5.2.B",
    "Indicator name": "Percentage of women reporting an increase of physical violence between household members during past 12 months."
  },
  {
    "SDG-MMCode": "MM-5.2.C",
    "Indicator name": "Number of cases of rape reported to the police per 100,000 population"
  },
  {
    "SDG-MMCode": "MM-5.2.D",
    "Indicator name": "Number of newly-filed judicial cases for rape on (a) adult, (b) on children per 100,000 population.",  },
  {
    "SDG-MMCode": "MM-5.2.E",
    "Indicator name": "Percentage of men and women who accept wife beating by husband under at least one of the following circumstances: (a) if she burns the food, (b) if she argues with him, (c) if she goes out without telling him, (d) if she neglects the children, (e) if she refuses sex with him, (f) if she refuses the use of contraception; (g) is involved into too much social activity; or (h) any of these reasons"
  },
  {
    "SDG-MMCode": "MM-5.2.F",
    "Indicator name": "Percentage of women who think that domestic violence (man onto woman) is justified if (a) she disobeys her husband or other family members, (b) if her husband suspects she has been unfaithful, (c) if she neglects the children, (d) if she spends money without permission, (e) if the husband is stressed."
  },
  {
    "SDG-MMCode": "MM-5.2.G",
    "Indicator name": "Number of women and girls seeking GBV support (a) for at least one type of support, and by type of support for (b) health, (c) social and (d) legal/justice."
  },
  {
    "SDG-MMCode": "MM-5.4.A",
    "Indicator name": "Percentage of household reporting an increase in domestic work over last 12 months"
  },
  {
    "SDG-MMCode": "MM-5.4.B",
    "Indicator name": "Percentage of formerly working women who cite the increase in domestic work (including caring responsibilities) as the main reason for ceasing paid work during the past 12 months."
  },
  {
    "SDG-MMCode": "MM-5.5.A",
    "Indicator name": "Proportion of women in managerial positions as (a) senior and middle management; (b) management (ISCO 08-1)"
  },
  {
    "SDG-MMCode": "MM-5.a.A",
    "Indicator name": "(a) Proportion of total agricultural population with ownership or secure rights over agricultural land, by sex; and (b) share of women among owners or rights-bearers of agricultural land, by type of tenure"
  },
  {
    "SDG-MMCode": "MM-5.b.A",
    "Indicator name": "Digital gender gaps for (a) internet access; (b) mobile phone access, based on Facebook Gender Gap Index."
  },
  {
    "SDG-MMCode": "MM-6.1.A",
    "Indicator name": "Proportion of population using (a) safely managed drinking water services; (b) basic services (improved within 30 min)"
  },
  {
    "SDG-MMCode": "MM-6.2.A",
    "Indicator name": "Proportion of population using (a) safely managed sanitation services; (b) at least basic sanitation services; and (c) a hand-washing facility with soap and water"
  },
  {
    "SDG-MMCode": "MM-6.6.A",
    "Indicator name": "To be developed: indicator on water-use efficiency (FAO, UNEP)"
  },
  {
    "SDG-MMCode": "MM-8.1.A",
    "Indicator name": "Annual growth rate of real GDP per capita"
  },
  {
    "SDG-MMCode": "MM-8.2.A",
    "Indicator name": "Annual growth rate of real GDP per employed person"
  },
  {
    "SDG-MMCode": "MM-8.3.A",
    "Indicator name": "Proportion of informal employment in total employment, by sector and sex"
  },
  {
    "SDG-MMCode": "MM-8.3.B",
    "Indicator name": "Average change in percentage of the (a) operating capacity; and (b) profit, among Myanmar businesses in the last completed month, by firm size (where available)."
  },
  {
    "SDG-MMCode": "MM-8.3.C",
    "Indicator name": "Percentage of firms using digital tools for their business as (a) total, (b) by type of tool (digital payment, debit/credit card, social media, accounting software)."
  },
  {
    "SDG-MMCode": "MM-8.3.D",
    "Indicator name": "Evolution in the use of e-payment among Myanmar firms as (a) percentage of firms adopting an on-line payment platform; and (b) year-on-year increase in e-commerce payments by firms."
  },
  {
    "SDG-MMCode": "MM-8.5.A",
    "Indicator name": "Average hourly earnings of employees, by sex, age, occupation and persons with disabilities"
  },
  {
    "SDG-MMCode": "MM-8.5.B",
    "Indicator name": "Unemployment rate, by sex, age and persons with disabilities"
  },
  {
    "SDG-MMCode": "MM-8.5.C",
    "Indicator name": "Work losses in (a) change in work hours per week in percent; (b) number of jobs."
  },
  {
    "SDG-MMCode": "MM-8.5.D",
    "Indicator name": "Percentage of Myanmar businesses reporting changes in worforce during the last completed month in the form  (a) hiring of new staff; (b) laying off staff."
  },
  {
    "SDG-MMCode": "MM-8.5.E",
    "Indicator name": "Percentage of households where at least one income-generating member has lost their job during the past XX months."
  },
  {
    "SDG-MMCode": "MM-8.5.F",
    "Indicator name": "Vulnerable employment, total (% of total employment) (modeled ILO estimate)"
  },
  {
    "SDG-MMCode": "MM-8.6.A",
    "Indicator name": "Proportion of youth (aged 15–24 years) not in education, employment or training"
  },
  {
    "SDG-MMCode": "MM-8.7.A",
    "Indicator name": "Proportion and number of children aged 5–17 years engaged in child labour, by sex and age"
  },
  {
    "SDG-MMCode": "MM-8.8.A",
    "Indicator name": "Occupational injuries (a) fatal, (b) non-fatal per 100,000 employees, by sex"
  },
  {
    "SDG-MMCode": "MM-8.8.B",
    "Indicator name": "Number of confirmed reports of (a) violation acts of freedom of association committed such as arrest, detention, imprisonment, killing and disappearance of trade unionists in relation to their trade union; (b) general prohibition of the right to strike; (c) forced labour cases; (d) underaged recruitment ."
  },
  {
    "SDG-MMCode": "MM-8.10.B",
    "Indicator name": "Percentage of businesses receiving loan(s) from a formal financial institution as (a) total, (b) from bank, (c) from non-banking financial institution (e.g. MFI, cooperative)"
  },
  {
    "SDG-MMCode": "MM-8.10.C",
    "Indicator name": "Percentage of Myanmar businesses reporting reduction in access to credit"
  },
  {
    "SDG-MMCode": "MM-8.10.E",
    "Indicator name": "Volume of (a)  outstanding loan portfolio, and (b) savings portfolio held by MFIs in MMK"
  },
  {
    "SDG-MMCode": "MM-8.10.F",
    "Indicator name": "Number of (a) of active borrowers and (b) active savers with MFIs"
  },
  {
    "SDG-MMCode": "MM-11.1.A",
    "Indicator name": "Proportion of urban population living in slums and informal settlements."
  },
  {
    "SDG-MMCode": "MM-11.2.A",
    "Indicator name": "Proportion of population that has access to public transport within a maximum distance of 1000 m."
  },
  {
    "SDG-MMCode": "MM-11.5.A",
    "Indicator name": "Number of (a) deaths and missing persons, and (b) directly affected persons attributed to disasters per 100,000 population"
  },
  {
    "SDG-MMCode": "MM-11.6.B",
    "Indicator name": "Annual mean levels of fine particulate matter (e.g. PM2.5 and PM10) in cities (population weighted)"
  },
  {
    "SDG-MMCode": "MM-11.7.A",
    "Indicator name": "Average share of the built-up area of cities that is open space for public use for all, by sex, age and persons with disabilities"
  },
  {
    "SDG-MMCode": "MM-16.1.A",
    "Indicator name": "Number of victims of intentional homicide per 100,000 population, by sex and age"
  },
  {
    "SDG-MMCode": "MM-16.1.B",
    "Indicator name": "Newly-filed cases with the justice system for homicide per 100,000 population."
  },
  {
    "SDG-MMCode": "MM-16.1.C",
    "Indicator name": "Conflict-related deaths per 100,000 population, by sex, age and cause"
  },
  {
    "SDG-MMCode": "MM-16.1.D",
    "Indicator name": "Vulnerability to Conflict Index"
  },
  {
    "SDG-MMCode": "MM-16.1.F",
    "Indicator name": "Proportion of population that feel safe walking alone around the area they live by (a) day-time, (b) night-time."
  },
  {
    "SDG-MMCode": "MM-16.1.G",
    "Indicator name": "Recorded cases of attacks against (a) health care and (b) humanitarian, personnel, assets and facilities."
  },
  {
    "SDG-MMCode": "MM-16.1.H",
    "Indicator name": "Number of people displaced internally by conflict as (a) new cases per year and (b) stock at year’s end."
  },
  {
    "SDG-MMCode": "MM-16.1.I",
    "Indicator name": "Percentage of households where one member or more is planning to migrate abroad in the next 12 months, by driver of migration"
  },
  {
    "SDG-MMCode": "MM-16.2.A",
    "Indicator name": "Number of victims of human trafficking per 100,000 population, by sex, age and form of exploitation"
  },
  {
    "SDG-MMCode": "MM-16.2.B",
    "Indicator name": "Newly-filed cases with the judicial system for trafficking in person, per 100,000 population."
  },
  {
    "SDG-MMCode": "MM-16.3.A",
    "Indicator name": "Number of people by sex and age who received legal aid services in a year"
  },
  {
    "SDG-MMCode": "MM-16.3.B",
    "Indicator name": "Rule of Law Index as (a) overall score and rank; b) civil justice score and rank; (c) criminal justice score and rank."
  },
  {
    "SDG-MMCode": "MM-16.9.A",
    "Indicator name": "Proportion of children under 5 years of age whose births have been registered with a civil authority, by age"
  },
  {
    "SDG-MMCode": "MM-16.10.A",
    "Indicator name": "Number of verified cases of killing, kidnapping, enforced disappearance, arbitrary detention and torture of journalists, associated media personnel, trade unionists and human rights advocates in the previous 12 months"
  },
  {
    "SDG-MMCode": "MM-16.10.B",
    "Indicator name": "Evolution of the constitutional, statutory and/or policy framework for public access to information, measured as (a) number of existing constitutional provisions or laws or policies amended or repealed with direct  impact on Myanmar's compliance with universal standards on access to public information, transparency in public governance and freedom of expression, disaggregated (i) positive impact, (ii) negative impact; (b) number of new constitutional provisions, laws or policies /policies adopted with impact Myanmar's compliance with universal standards on freedom of expression and right to Information principles, disaggregated (i) positive impact, (ii) negative impact."
  }
]

router.get("/", function (req, res, next) {
    const id = process.env.surveyid;
    axios
    .get(`https://kobo.humanitarianresponse.info/assets/${id}/submissions/?format=json`, {
      headers: {
        Authorization: `Token ${process.env.token}`,
      },
    })
    .then((d) => {
      const dataFiltered = d.data.filter(el => el['sdgs_name/indicator'] === req.query.indicator && el['_validation_status'].label === 'Approved')
      const dataFormated = []
      dataFiltered.forEach(el => {        
        const periodKeys = Object.keys(el).filter(key => key.includes('rperiod') && key !== 'rperiod/reporting_type' && key !== 'rperiod/reporting_format');
        el.splitindicators?.forEach(si => {
          si['splitindicators/arearepeatsplit'].forEach(area => {
            const keys = Object.keys(area).filter(key => key.includes('reportinglevelssplit'));
            const value = {
              indicatorCode: el['sdgs_name/indicator'],
              indicator: IndicatorList.findIndex(ind => ind['SDG-MMCode'] === el['sdgs_name/indicator']) !== -1 ? IndicatorList[IndicatorList.findIndex(ind => ind['SDG-MMCode'] === el['sdgs_name/indicator'])]['Indicator name'] : null,
              reporting_type: el['rperiod/reporting_type'],
              indicator_split: si['splitindicators/indxsplit'],
              area: area['splitindicators/arearepeatsplit/areaxsplit'],
              unit: area['splitindicators/arearepeatsplit/observationssplit/unitsplit'],
              data_source: el['datasources/title']
            }
            periodKeys?.forEach(key => {
              if(key.split(`/`)[key.split(`/`).length - 1] === 'cyear' || key.split(`/`)[key.split(`/`).length - 1] === 'year')
                value[key.split(`/`)[key.split(`/`).length - 1]] = 2012 + parseInt(el[key], 10);
              else
                value[key.split(`/`)[key.split(`/`).length - 1]] = el[key], 10;
            })
            value.overall_value = area['splitindicators/arearepeatsplit/observationssplit/overallindicatorvaluesplit'];
            keys?.forEach(key => {
              value[key.split(`/`)[key.split(`/`).length - 1]] = area[key]
            })
            dataFormated.push(value)
          })
        })
        el.arearepeat?.forEach(area => {
          const keys = Object.keys(area).filter(key => key.includes('reportinglevels'));
          const value = {
            indicatorCode: el['sdgs_name/indicator'],
            indicator: IndicatorList.findIndex(ind => ind['SDG-MMCode'] === el['sdgs_name/indicator']) !== -1 ? IndicatorList[IndicatorList.findIndex(ind => ind['SDG-MMCode'] === el['sdgs_name/indicator'])]['Indicator name'] : null,
            reporting_type: el['rperiod/reporting_type'],
            area: area['arearepeat/areax'],
            unit: area['arearepeat/observations/unit'],
            data_source: el['datasources/title']
          }
          periodKeys?.forEach(key => {
            if(key.split(`/`)[key.split(`/`).length - 1] === 'cyear' || key.split(`/`)[key.split(`/`).length - 1] === 'year')
              value[key.split(`/`)[key.split(`/`).length - 1]] = 2012 + parseInt(el[key], 10);
            else
              value[key.split(`/`)[key.split(`/`).length - 1]] = el[key], 10;
          })
          value.overall_value = area['arearepeat/observations/overallindicatorvalue'];
          keys?.forEach(key => {
            value[key.split(`/`)[key.split(`/`).length - 1]] = area[key]
          })
          dataFormated.push(value)
        })
      })
      res.json(dataFormated);          
    })
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;