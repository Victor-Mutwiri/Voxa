import { useState } from "react";
import useStore from "../useStore";

export default function LeadSearchForm({ onSubmit }) {
    const userId  = useStore((state) => state.userId);
  const [formData, setFormData] = useState({
    person_titles: [],
    include_similar_titles: true,
    person_locations: [],
    person_seniorities: [],
    organization_num_employees_ranges: [],
    number_of_leads: 10, // default minimum
  });

  const seniorityOptions = [
    "owner",
    "founder",
    "c_suite",
    "partner",
    "vp",
    "head",
    "director",
    "manager",
    "senior",
    "entry",
    "intern",
  ];

  const employeeRangeOptions = [
    "1,10",
    "11,50",
    "51,100",
    "101,250",
    "251,500",
    "501,1000",
    "1001,5000",
    "5001,10000",
    "10001,20000",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // for comma-separated inputs like titles and locations
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({
      ...prev,
      include_similar_titles: e.target.checked,
    }));
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const values = Array.from(options)
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);

    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };

  const handleNumberChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 10;
    if (value < 10) value = 10;
    if (value > 500) value = 500;

    setFormData((prev) => ({
      ...prev,
      number_of_leads: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('current userId:', userId);
    const payload = {
      ...formData,
      user_id: userId,
    };
    if (onSubmit) onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Job Titles */}
      <div>
        <label className="block mb-1">Job Titles (comma separated)</label>
        <input
          type="text"
          name="person_titles"
          onChange={handleChange}
          placeholder="e.g. Marketing Manager, Sales Rep"
          className="border p-2 w-full"
        />
      </div>

      {/* Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.include_similar_titles}
            onChange={handleCheckbox}
          />
          Include Similar Titles
        </label>
      </div>

      {/* Locations */}
      <div>
        <label className="block mb-1">Locations (comma separated)</label>
        <input
          type="text"
          name="person_locations"
          onChange={handleChange}
          placeholder="e.g. California, Chicago, Ireland"
          className="border p-2 w-full"
        />
      </div>

      {/* Seniorities */}
      <div>
        <label className="block mb-1">Seniorities</label>
        <select
          name="person_seniorities"
          multiple
          onChange={handleMultiSelect}
          className="border p-2 w-full"
        >
          {seniorityOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Hold Ctrl (Windows) / Cmd (Mac) to select multiple
        </p>
      </div>

      {/* Employee ranges */}
      <div>
        <label className="block mb-1">Employee Ranges</label>
        <select
          name="organization_num_employees_ranges"
          multiple
          onChange={handleMultiSelect}
          className="border p-2 w-full"
        >
          {employeeRangeOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Each range is in the format: min,max
        </p>
      </div>

      {/* Number of leads */}
      <div>
        <label className="block mb-1">Number of Leads (10 - 500)</label>
        <input
          type="number"
          name="number_of_leads"
          value={formData.number_of_leads}
          min={10}
          max={500}
          onChange={handleNumberChange}
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Search Leads
      </button>
    </form>
  );
}
