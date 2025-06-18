// Resume Builder Pro — Enhanced Version (Frontend-Only)

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveAs } from 'file-saver';

export default function ResumeBuilderPro() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [brag, setBrag] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [mysticMode, setMysticMode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const generateResume = () => {
    let bullet = brag ? `- ${rewordBrag(brag)}\n` : '';
    let mysticNote = mysticMode ? `\n\nSoul Gifts: Empathic communicator, aligned with service, mission-driven energy.` : '';
    const tailoredLine = jobDesc ? `\n\nTailored for: ${extractKeywords(jobDesc)}` : '';
    const content = `Name: ${name}\nTitle: ${title}\n\nExperience:\n${experience}\n\nKey Achievements:\n${bullet}${tailoredLine}${mysticNote}`;
    setResumeText(content);
  };

  const rewordBrag = (text) => {
    return text.replace(/managed/i, 'Oversaw and optimized')
               .replace(/led/i, 'Spearheaded')
               .replace(/created/i, 'Developed and executed')
               .replace(/team/i, 'cross-functional team')
               .replace(/budget/i, 'strategic budget allocations')
               .replace(/\$/g, '$$');
  };

  const extractKeywords = (desc) => {
    const keywords = desc.match(/\b(JavaScript|Python|CRM|marketing|design|strategy|data|sales)\b/gi);
    return keywords ? keywords.join(', ') : 'General professional competencies';
  };

  const downloadResume = () => {
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "resume.txt");
  };

  const unlockPremium = () => {
    window.open('https://jdanforthco.gumroad.com/l/rrbsj', '_blank');
    setUnlocked(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Resume Builder Pro</h1>

      <Card>
        <CardContent className="space-y-4">
          <Input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Job Title (e.g. Web Developer)" value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea placeholder="Work Experience" value={experience} onChange={e => setExperience(e.target.value)} />

          {unlocked && (
            <>
              <Input placeholder="Brag Sentence (e.g. Managed $1M budget)" value={brag} onChange={e => setBrag(e.target.value)} />
              <Textarea placeholder="Paste Job Description for Tailoring" value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={mysticMode} onChange={() => setMysticMode(!mysticMode)} />
                <label>Mystic Mode</label>
              </div>
            </>
          )}

          <Button onClick={generateResume}>Generate Resume</Button>

          {!unlocked && (
            <Button variant="outline" onClick={unlockPremium}>Unlock Premium Features</Button>
          )}
        </CardContent>
      </Card>

      {resumeText && (
        <Card>
          <CardContent className="space-y-4">
            <pre className="whitespace-pre-wrap text-sm">{resumeText}</pre>
            <Button onClick={downloadResume}>Download as TXT</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
