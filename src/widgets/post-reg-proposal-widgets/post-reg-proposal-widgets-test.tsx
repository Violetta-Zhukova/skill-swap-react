import { ProposalWidgets } from "./post-reg-proposal-widgets";
import users from "../../../public/db/users.json";

const ProposalWidgetsWrapper = () => {
  return (
    <ProposalWidgets
      title="Ваше предложение"
      skillCanTeach={users[0].skillCanTeach}
      images={users[0].images}
      onClickEdit={() => {}}
      onClickReady={() => {}}
    />
  );
};

export default ProposalWidgetsWrapper;
