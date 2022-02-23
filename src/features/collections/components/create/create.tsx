import InputText from "components/form/inputs/text";
import ButtonSubmit from "components/form/buttons/submit";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "libs/API";

type Inputs = {
  name: string,
  description: string,
};

export default function Create() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await API.post("/collections", { ...data })
      location.reload()
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <section className="p-6 m-6 rounded border bg-white card">
        <h2 className="text-2xl font-semibold mb-4">
          Créer une nouvelle collection
        </h2>
        <p>Créer une nouvelle collection afin de gérer les contenus qui se répète sur votre site web.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText error={errors.name}>
            <>
              <label htmlFor="name" className="input-text--label">
                Nom
              </label>
              <input
                {...register("name", { required: "Le nom est requis." })}
                type="text"
                name="name"
                id="name"
                className="input-text"
                placeholder=""
              />
            </>
          </InputText>
          <InputText error={errors.description}>
            <>
              <label htmlFor="description" className="input-text--label">
                Description
              </label>
              <textarea
                {...register("description", { required: "La description est requise." })}
                name="description"
                id="description"
                className="input-text"
                placeholder=""
                rows={5}
                cols={33}
              />
            </>
          </InputText>
          <ButtonSubmit>
            <>Créer la collection</>
          </ButtonSubmit>
        </form>
      </section>
      <hr className='lg:hidden' />
    </>
  );
}
