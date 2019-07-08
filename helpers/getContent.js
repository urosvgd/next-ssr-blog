const fs = require('fs');
const path = require('path');
const { createClient } = require('contentful');

require('dotenv').config();

const SPACE = process.env.CONTENTFUL_SPACE;
const TOKEN = process.env.CONTENTFUL_TOKEN;

const client = createClient({
  space: SPACE,
  accessToken: TOKEN,
});

const dataDir = path.join(__dirname, '..', 'data', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

function getFields(entry) {
  if (entry.sys) {
    return {
      id: entry.sys.id,
      ...entry.fields,
    };
  }

  return entry;
}

async function getEntries(type) {
  const entries = await client.getEntries({
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: type,
  });

  const contents = entries.items.map(({ sys, fields }) => {
    return {
      id: sys.id,
      ...fields,
    };
  });

  fs.writeFileSync(
    path.join(dataDir, `${type}.json`),
    JSON.stringify(contents)
  );
}

async function getCases() {
  const entries = await client.getEntries({
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'case',
  });

  const contents = entries.items
    .map(({ sys, fields }) => {
      const {
        media = [],
        partners = [],
        technologies = [],
        categories = [],
        publishedAt,
        ...rest
      } = fields;
      return {
        ...rest,
        id: sys.id,
        publishedAt: publishedAt ? publishedAt : sys.createdAt,
        media: media.map(getFields),
        partners: partners.map(getFields),
        technologies: technologies.map(getFields).map(entry => entry.name),
        categories: categories.map(getFields).map(entry => entry.name),
      };
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  fs.writeFileSync(path.join(dataDir, 'case.json'), JSON.stringify(contents));
}

async function getMenu() {
  const entries = await client.getEntries({
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'menu',
    include: 2,
  });

  const contents = entries.items.reduce((acc, { sys, fields }) => {
    acc[fields.label] = fields.menuItems.map(getFields).map(item => ({
      label: item.label,
      slug: getFields(item.page).slug,
    }));

    return acc;
  }, {});
  fs.writeFileSync(path.join(dataDir, 'menu.json'), JSON.stringify(contents));
}

const getcontent = async () => {
  await getCases();
  await getMenu();
  await getEntries('page');
  await getEntries('employee');
  return true;
};

getcontent();
