"use client";

export function VaccinationSchedule() {
  const schedule = [
    {
      age: "Birth",
      vaccines: [
        { name: "BCG", disease: "Tuberculosis" },
        { name: "OPV-0", disease: "Polio" },
        { name: "Hep B-1", disease: "Hepatitis B" },
      ],
    },
    {
      age: "6 Weeks",
      vaccines: [
        { name: "OPV-1", disease: "Polio" },
        { name: "Pentavalent-1", disease: "DPT, Hep B, Hib" },
        { name: "Rotavirus-1", disease: "Rotavirus infection" },
        { name: "fIPV-1", disease: "Polio" },
        { name: "PCV-1", disease: "Pneumonia" },
      ],
    },
    {
      age: "10 Weeks",
      vaccines: [
        { name: "OPV-2", disease: "Polio" },
        { name: "Pentavalent-2", disease: "DPT, Hep B, Hib" },
        { name: "Rotavirus-2", disease: "Rotavirus infection" },
      ],
    },
    {
      age: "14 Weeks",
      vaccines: [
        { name: "OPV-3", disease: "Polio" },
        { name: "Pentavalent-3", disease: "DPT, Hep B, Hib" },
        { name: "Rotavirus-3", disease: "Rotavirus infection" },
        { name: "fIPV-2", disease: "Polio" },
        { name: "PCV-2", disease: "Pneumonia" },
      ],
    },
    {
      age: "9 Months",
      vaccines: [
        { name: "MR-1", disease: "Measles & Rubella" },
        { name: "PCV-Booster", disease: "Pneumonia" },
      ],
    },
    {
      age: "16-24 Months",
      vaccines: [
        { name: "DPT-Booster", disease: "Diphtheria, Pertussis, Tetanus" },
        { name: "OPV-Booster", disease: "Polio" },
        { name: "MR-2", disease: "Measles & Rubella" },
      ],
    },
    {
      age: "5-6 Years",
      vaccines: [
        { name: "DPT-Booster-2", disease: "Diphtheria, Pertussis, Tetanus" },
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              IAP Recommended Vaccination Schedule
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              A comprehensive guide to keeping your child protected from birth
              to adolescence.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-border shadow-2xl shadow-blue-900/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">
                      Child's Age
                    </th>
                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-center">
                      Vaccine
                    </th>
                    <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider">
                      Protects Against
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {schedule.map((item, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-8 py-6 font-bold text-blue-600 bg-blue-50/30 w-[20%]">
                        {item.age}
                      </td>
                      <td className="w-full p-0" colSpan={2}>
                        <div className="divide-y divide-border/50">
                          {item.vaccines.map((v, vIdx) => (
                            <div
                              key={vIdx}
                              className="grid grid-cols-[1fr,1.5fr] items-center"
                            >
                              <div className="px-8 py-4 font-bold text-foreground text-center bg-white">
                                {v.name}
                              </div>
                              <div className="px-8 py-4 text-muted-foreground font-medium bg-white">
                                {v.disease}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 p-6 border-t border-border">
              <p className="text-sm text-blue-600 font-medium text-center">
                * Schedule adapted from Government of India Universal
                Immunization Programme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
