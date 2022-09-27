import { TableInfo } from "../types/main";
import Input from "./Form/Input";
import Button from "./Form/Button";
import Textarea from "./Form/Textarea";
import Select from "./Form/Select";

const FormSection = ({ activeTable }: { activeTable: TableInfo | null }) => {
  return (
    <form className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1">
      <Input name="some name" />
      <Textarea name="somemessage" />
      <Select
        name="select"
        options={[{ name: "somename", value: "somevalue" }]}
      />

      <Button>Submit</Button>
    </form>
  );
};

export default FormSection;
