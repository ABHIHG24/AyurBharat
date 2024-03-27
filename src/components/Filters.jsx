import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
const Filters = () => {
  const { products, categories, companies, params } = useLoaderData();
  const { title, company, category, shipping } = params;
  const { ["ratings[lte]"]: ratingsLTE, ["price[lte]"]: priceLTE } = params;
  console.log(ratingsLTE);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput
        type="search"
        label="search product"
        name="title"
        size="input-sm"
        defaultValue={title}
      />
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        size="select-sm"
        defaultValue={category}
      />
      <FormSelect
        label="select company"
        name="company"
        list={companies}
        size="select-sm"
        defaultValue={company}
      />
      <FormRange
        name="ratings[lte]"
        label="Rating"
        size="range-sm"
        price={ratingsLTE}
        defaultValue={ratingsLTE}
        stepValue={1}
        max={5}
      />
      <FormRange
        name="price[lte]"
        label="select price"
        size="range-sm"
        price={priceLTE}
        defaultValue={priceLTE}
        max={5000}
        stepValue={100}
        symbol={"₹"}
      />
      <FormCheckbox
        name="keyword"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
