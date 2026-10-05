// src/sections/Education.js
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FiAward, FiBookOpen, FiCheck, FiMaximize2, FiStar } from 'react-icons/fi';
import Lightbox from '../components/Lightbox';
import { Card, Reveal, Section } from '../components/ui';
import { achievements, awards, certifications, education } from '../data/profile';

const Awards = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AwardCard = styled(Card)`
  padding: 2rem;
  background: ${({ theme }) => `linear-gradient(160deg, ${theme.colors.primarySoft}, transparent 60%), ${theme.colors.elevated}`};

  .head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
  }
  .star {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};
    font-size: 1.15rem;
  }
  h3 {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-size: 1.6rem;
  }
  .org {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.subtle};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  display: flex;
  flex-direction: column;

  blockquote {
    margin: 0 0 1.5rem;
    flex: 1;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: 1.12rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

// Thumbnail of the actual certificate; opens the full image in a lightbox.
const Proof = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  text-align: left;
  cursor: zoom-in;
  transition: border-color 0.2s ease, background 0.2s ease;

  .thumb {
    position: relative;
    flex-shrink: 0;
    width: 104px;
    aspect-ratio: 4 / 3;
    border-radius: 9px;
    overflow: hidden;
    background: #fff;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .label strong { display: block; font-size: 0.92rem; font-weight: 600; }
  .label span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.primaryInk};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLine};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
  &:hover .thumb img { transform: scale(1.08); }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Panel = styled(Card)`
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
  h3 svg { color: ${({ theme }) => theme.colors.primaryInk}; }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.1rem;
`;

const Entry = styled.li`
  strong { display: block; font-size: 0.95rem; font-weight: 600; }
  span { display: block; font-size: 0.875rem; color: ${({ theme }) => theme.colors.muted}; }
  small {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.subtle};
  }
`;

const Cert = styled.li`
  display: flex;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};

  svg { flex-shrink: 0; margin-top: 0.3rem; color: ${({ theme }) => theme.colors.primaryInk}; }
`;

const Education = () => {
  const [viewing, setViewing] = useState(null);
  const close = useCallback(() => setViewing(null), []);

  return (
    <Section id="recognition" eyebrow="05 · Recognition" title={<>Awards, education &amp; <em>more</em></>}>
      <Awards>
        {awards.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08}>
            <AwardCard>
              <div className="head">
                <span className="star"><FiStar /></span>
                <div>
                  <h3>{a.name}</h3>
                  <span className="org">{a.org}</span>
                </div>
              </div>
              <blockquote>“{a.quote}”</blockquote>
              {a.image && (
                <Proof
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() =>
                    setViewing({
                      src: a.image,
                      alt: `${a.name} USTAR recognition certificate from UST`,
                      caption: (
                        <>
                          <strong>{a.name}</strong> · {a.org}
                        </>
                      ),
                    })
                  }
                >
                  <span className="thumb">
                    <img src={a.thumb} alt="" loading="lazy" />
                  </span>
                  <span className="label">
                    <strong>View certificate</strong>
                    <span>
                      <FiMaximize2 /> Open full size
                    </span>
                  </span>
                </Proof>
              )}
            </AwardCard>
          </Reveal>
        ))}
      </Awards>
      <Lightbox image={viewing} onClose={close} />

      <Grid>
        <Reveal>
          <Panel>
            <h3><FiBookOpen /> Education</h3>
            <List>
              {education.map((e) => (
                <Entry key={e.degree}>
                  <strong>{e.degree}</strong>
                  <span>{e.school}</span>
                  <small>{e.period}{e.note ? ` · ${e.note}` : ''}</small>
                </Entry>
              ))}
            </List>
          </Panel>
        </Reveal>
        <Reveal delay={0.06}>
          <Panel>
            <h3><FiAward /> Hackathons &amp; activities</h3>
            <List>
              {achievements.map((a) => (
                <Entry key={a.detail}>
                  <strong>{a.label}</strong>
                  <span>{a.detail}</span>
                </Entry>
              ))}
            </List>
          </Panel>
        </Reveal>
        <Reveal delay={0.12}>
          <Panel>
            <h3><FiCheck /> Certifications</h3>
            <List>
              {certifications.map((c) => (
                <Cert key={c}>
                  <FiCheck />
                  {c}
                </Cert>
              ))}
            </List>
          </Panel>
        </Reveal>
      </Grid>
    </Section>
  );
};

export default Education;
