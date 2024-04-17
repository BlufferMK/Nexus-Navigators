export const aggregateFrom = (raw) =>
    [office,
        multifamily_housing,
        schools, healthcare, college_university,
        lodging,
        retail].find((it) => it.alts.includes(raw))?.category

const office = {
    category: "Office",
    alts: ["Bank Branch", "Financial Office", "Office"]
}

const multifamily_housing =
    {
        category: "Multifamily Housing",
        alts: ["Multifamily Housing"]
    }


const schools =
    {
        category: "Schools",
        alts: ["K-12 School"]
    }


const healthcare =
    {
        category: "Healthcare",
        alts: ["Ambulatory Surgical Center", "Outpatient Rehabilitation/Physical Therapy", "Urgent Care/Clinic/Other Outpatient",
            "Hospital (General Medical & Surgical)", "Medical Office", "Other - Specialty Hospital"]
    }

const college_university =
    {
        category: "College/University",
        alts: ["College/University"]
    }


const lodging =
    {
        category: "Lodging",
        alts: ["Hotel", "Residential Care Facility", "Senior Care Community", "Residence Hall/Dormitory",
            "Other - Lodging/Residential"]
    }


const retail =
    {
        category: "Retail",
        alts: ["Automobile Dealership", "Vehicle Dealership", "Enclosed Mall", "Other - Mall", "Lifestyle Center", "Strip Mall", "Retail Store",
            "Supermarket/Grocery Store", "Wholesale Club/Supercenter", "Other - Services", "Repair Services"]
    }
