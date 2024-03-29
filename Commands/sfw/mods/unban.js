export default {
  name: "unban",
  alias: ["unbanned"],
  category: "mods",
  description: "To ban any user or group use this command..!!",
  run: async (
    Neko,
    m,
    { from, isGroup, args, groupId, quoted, isOwner, isMe, nul },
  ) => {
    try {
      if (!isOwner)
        return m.reply("edit", nul, `*_Only Owner Can Use this command...!_*`);
      let senderRegex = /^@\d{12}$/;
      if (isGroup) {
        let Group = await Neko.GroupDb.getGroup(groupId);
        let mess = `${Group.name} *_Group is already UnBanned from using this Bot..!!_*`;

        if (
          !Group.isBanned &&
          !(quoted || senderRegex.test(args?.split(" ")[0] || args))
        )
          return await m.reply("edit", nul, mess);

        if (Group.isBanned) {
          if (!quoted && !senderRegex.test(args)) {
            await Neko.GroupDb.setGcBanned(groupId, false);
            Neko.banGc.splice(Neko.banGc.indexOf(groupId), 1);
            if (args.length > 5) {
              await Neko.GroupDb.setReason(groupId, args);
              return m.reply(
                "edit",
                nul,
                `${Group.name} *_Group has been UnBanned from using this bot for this reason_* \n\n *_Reason:_* ${args}`,
              );
            }

            return m.reply(
              "edit",
              nul,
              `${Group.name} *_Group has been UnBanned from using this bot..!!_*`,
            );
          }
        }
      }

      if (
        isGroup &&
        (quoted || senderRegex.test(args?.split(" ")[0] || args))
      ) {
        let user = quoted?.split("@")[0] || args.split("@")[1];

        let sender = await Neko.UserDb.getUser(user);

        if (!sender.isBanned) {
         let mess = `@${user} *_is already UnBanned from using this Bot..!!_*`
          return m.reply("mention", `${user}@s.whatsapp.net`, mess);
        }

        if (sender.isBanned) {
        let mess = `@${user} *_has been UnBanned from using this bot_*`
          await Neko.UserDb.setBanned(user, false);
  Neko.banUsers.splice(Neko.banUsers.indexOf(user),1);
          return m.reply("mention", `${user}@s.whatsapp.net`, mess);
        }
      }

      if (!isGroup) {
        if (!quoted)
          return m.reply(
            "edit",
            nul,
            "*_please tag/quoted user to UnBan...!!_*",
          );
        let user = quoted.split("@")[0];

        let sender = await Neko.UserDb.getUser(user);

        let mes = `@${user} *_is already UnBanned for using this bot...!!_*`;
        if (!sender.isBanned)
          return m.reply("mention", `${user}@s.whatsapp.net`, mes);

        if (sender.isBanned) {
          let mess = `@${user} *_have been UnBanned from using this bot...!!_*`;
          await Neko.UserDb.setBanned(user, false);
  Neko.banUsers.splice(Neko.banUsers.indexOf(user),1);
          return m.reply("mention", `${user}@s.whatsapp.net`, mess);
        }
      }
    } catch (error) {
      m.reply("edit", nul, "*_Error!!_*");
    }
  },
};
