import axios from "axios";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);

    return redirect("/");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section>
      <Form className="form" method="POST">
        <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
          our newsletter
        </h4>
        {/* name */}
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            name="name"
            required
            id="name"
          />
        </div>
        {/* lastName */}
        <div className="form-row">
          <label htmlFor="lastName" className="form-label">
            last name
          </label>
          <input
            type="text"
            className="form-input"
            name="lastName"
            id="lastName"
            required
          />
        </div>
        {/* email */}
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            defaultValue="test@test.com"
            className="form-input"
            name="email"
            id="email"
          />
        </div>
        <button
          className="btn btn-block"
          disabled={isSubmitting}
          style={{ marginTop: "0.5rem" }}
        >
          {isSubmitting ? "submitting" : "submit"}
        </button>
      </Form>
    </section>
  );
};

export default Newsletter;
