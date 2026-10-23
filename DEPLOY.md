# ເອົາເວັບຂຶ້ນອອນລາຍ ແລະຮັບຄຳຕອບ

ໄຟລ໌ໃນໂຟນເດີນີ້ຍັງບໍ່ມີ public link. ນຳໂຟນເດີຂຶ້ນ GitHub ແລ້ວຈຶ່ງສາມາດ deploy ດ້ວຍ Netlify ໄດ້.

## Deploy ເວັບ

1. ສ້າງ GitHub repository ໃໝ່ ແລະອັບໂຫຼດໄຟລ໌ໃນໂຟນເດີນີ້.
2. ເຂົ້າ [Netlify](https://app.netlify.com/), ເລືອກ **Add new project → Import an existing project**, ແລ້ວເລືອກ repository.
3. ໃຫ້ publish directory ເປັນ `.` ແລະ deploy. ເຈົ້າຈະໄດ້ URL ສຳລັບແຊ.

## ທາງເລືອກ: Cloudflare Pages

ໂຄງການນີ້ມີ Cloudflare Pages Function ຢູ່ `functions/api/answer.js` ສຳລັບຮັບຄຳຕອບ. ສາມາດເຊື່ອມ repository ດຽວກັນໃນ Cloudflare Pages ແລະກຳນົດ build command ເປັນຫວ່າງ, output directory ເປັນ `.`. ຫຼັງຈາກ deploy ແລ້ວ ຕ້ອງເພີ່ມ `ANSWER_SHEET_TOKEN` ໃນ **Settings → Variables and Secrets** ແລະ redeploy ເພື່ອເປີດການບັນທຶກຄຳຕອບ.

## ໃຊ້ Cloudflare Worker ໂຕເກົ່າ

ສຳລັບ Worker `my-first-website` ທີ່ມີ URL `workers.dev`, ໃຫ້ໃຊ້ `worker.js` ແລະ `wrangler.jsonc` ໃນ repository. ຕັ້ງ deploy command ໃຫ້ໃຊ້ `npx wrangler deploy`, ແລ້ວເພີ່ມ Secret ຊື່ `ANSWER_SHEET_TOKEN` ຜ່ານ **Workers & Pages → my-first-website → Settings → Variables and Secrets**. Secret value ແມ່ Master Key JSONBin. Deploy Worker ໃໝ່; code ຈະເກັບ asset ໜ້າເວັບເກົ່າ ແລະຮັບ `POST /api/answer` ຢູ່ Worker ດຽວກັນ.

## ເປີດການບັນທຶກຄຳຕອບ

1. ສ້າງ JSONBin account ແລະຄັດລອກ **Master Key** ຈາກ dashboard. ຢ່າໃສ່ key ນີ້ໃນ HTML ຫຼື JavaScript ຂອງໜ້າເວັບ.
2. ໃນ Netlify project ເຂົ້າ **Project configuration → Environment variables**, ເພີ່ມ `ANSWER_SHEET_TOKEN` ແລະວາງ Master Key ເປັນຄ່າ.
3. ສັ່ງ deploy ໃໝ່. ຈາກນັ້ນເມື່ອຜູ້ຮັບກົດ `Ok` ຫຼືກົດ `Br` ຈົນຄົບ 4 ຄັ້ງ ຜົນຈະຖືກສົ່ງໄປ JSONBin.
4. ເບິ່ງຜົນໃນ JSONBin dashboard, ໃນ bin ຊື່ `website-answers`.

ຖ້າຍັງບໍ່ໄດ້ຕັ້ງ `ANSWER_SHEET_TOKEN`, ເວັບຈະຍັງເຮັດວຽກໄດ້ ແຕ່ຈະບໍ່ເກັບຄຳຕອບ.
