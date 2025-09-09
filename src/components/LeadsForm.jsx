import { useState } from "react";
import useStore from "../useStore";
import '../styles/LeadsForm.css'

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
    <form onSubmit={handleSubmit} className="lead-search-form">
      <h2>Find Your Leads</h2>
      
      {/* Job Titles */}
      <div className="form-group">
        <label htmlFor="person_titles">Job Titles (comma separated)</label>
        <input
          type="text"
          id="person_titles"
          name="person_titles"
          onChange={handleChange}
          placeholder="e.g. Marketing Manager, Sales Rep"
          className="form-input"
        />
      </div>

      {/* Checkbox */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="include_similar_titles"
          checked={formData.include_similar_titles}
          onChange={handleCheckbox}
        />
        <label htmlFor="include_similar_titles">Include Similar Titles</label>
      </div>

      {/* Locations */}
      <div className="form-group">
        <label htmlFor="person_locations">Locations (comma separated)</label>
        <input
          type="text"
          id="person_locations"
          name="person_locations"
          onChange={handleChange}
          placeholder="e.g. California, Chicago, Ireland"
          className="form-input"
        />
      </div>

      {/* Seniorities */}
      <div className="form-group">
        <label htmlFor="person_seniorities">Seniorities</label>
        <select
          id="person_seniorities"
          name="person_seniorities"
          multiple
          onChange={handleMultiSelect}
          className="form-input"
        >
          {seniorityOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="helper-text">
          Hold Ctrl (Windows) / Cmd (Mac) to select multiple
        </p>
      </div>

      {/* Employee ranges */}
      <div className="form-group">
        <label htmlFor="organization_num_employees_ranges">Employee Ranges</label>
        <select
          id="organization_num_employees_ranges"
          name="organization_num_employees_ranges"
          multiple
          onChange={handleMultiSelect}
          className="form-input"
        >
          {employeeRangeOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <p className="helper-text">
          Each range is in the format: min,max
        </p>
      </div>

      {/* Number of leads */}
      <div className="form-group">
        <label htmlFor="number_of_leads">Number of Leads (10 - 500)</label>
        <input
          type="number"
          id="number_of_leads"
          name="number_of_leads"
          value={formData.number_of_leads}
          min={10}
          max={500}
          onChange={handleNumberChange}
          className="form-input"
        />
      </div>

      <button type="submit" className="submit-button">
        Search Leads
      </button>
    </form>
  );
}
