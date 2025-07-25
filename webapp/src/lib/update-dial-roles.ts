import { patchIdentity } from "./ziti/identities";
import client from "./db";
import { getShareServiceSlugs } from "@/db/types/shares.queries";
import dialRole from "./ziti/dial-role";
import { getPrivateHttpsBindingsByUser } from "@/db/types/private_https_bindings.queries";

const updateDialRoles = async (user_id: string) => {
    // const _slugs1 = (await getShareServiceSlugs.run({ user_id: user_id }, client)).map(e => e.slug);
    // const _slugs2 = (await getAutomaticallySharedTunnelBindings.run({ user_id: user_id }, client)).map(e => e.slug);
    // const _slugs3 = (await getPrivateHttpsBindingsByUser.run({ user_id:  user_id }, client)).map(e => `${e.service_slug}-private-https`);
    // const slugs = [..._slugs1, ..._slugs2, ..._slugs3];
    // const roleAttributes = slugs.map(dialRole);
    // const identities = await getUserIdentities.run({ user_id: user_id }, client);
    // await Promise.all(identities.map(async i => {
    //     return await patchIdentity({
    //         ziti_id: i.ziti_id,
    //         data: { roleAttributes: roleAttributes }
    //     });
    // }));
}

export default updateDialRoles;
