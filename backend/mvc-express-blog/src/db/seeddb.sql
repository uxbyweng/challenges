-- seeddb.sql

-- delete old tables
DROP TABLE IF EXISTS blog_entries;
DROP TABLE IF EXISTS authors;

-- create authors table
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Autoren aus den Posts
INSERT INTO authors (name) VALUES
  ('Peter Parker');

-- create new table
CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        image TEXT NOT NULL,
        author_id INTEGER NOT NULL REFERENCES authors(id),
        createdAt INTEGER NOT NULL,
        teaser TEXT NOT NULL,                
        content TEXT NOT NULL
);

-- Startdaten (author_id 1 = Peter Parker, siehe authors oben)
INSERT INTO blog_entries (title, slug, image, author_id, createdAt, teaser, content) VALUES
  (
    'Black: The Absence, Not the Presence, of Color',
    'black-the-absence-not-the-presence-of-color',
    'colorful-umbrella.jpg',
    1,
    1743120000,
    'Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.',
    '<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>'
  ),
  (
    'Flowers: Nature''s Muse for Design',
    'flowers-nature-s-muse-for-design',
    'flowers.jpg',
    1,
    1745452800,
    'Flowers inspire design with their color palettes, structure, and balance between repetition and variation.',
    '<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>'
  ),
  (
    'Design''s Harmony: Core Purpose and Supporting Details',
    'design-s-harmony-core-purpose-and-supporting-details',
    'sailing.jpg',
    1,
    1748736000,
    'Strong design starts with one clear core idea, then adds supporting details that reinforce it.',
    '<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>'
  );
