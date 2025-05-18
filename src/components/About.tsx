
import { Progress } from '@/components/ui/progress';

const skills = [
  { name: 'Frontend Development', level: 90 },
  { name: 'Backend Development', level: 85 },
  { name: 'UI/UX Design', level: 75 },
  { name: 'DevOps', level: 70 },
  { name: 'Mobile Development', level: 65 },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold heading">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  About Me
                </span>
              </h2>
              
              <p className="text-lg">
                Hello! I'm Jhon, a passionate full stack developer with 6+ years of experience
                in building digital products and services. I enjoy creating beautifully designed,
                intuitive and functional applications using modern technologies.
              </p>
              
              <p>
                I started my journey as a frontend developer and gradually expanded my skills
                to backend development, database design, and deployment. Now, I work across
                the entire stack and enjoy both the visual and technical aspects of software development.
              </p>
              
              <p>
                My approach combines technical knowledge with creative problem-solving.
                I believe in writing clean, maintainable code and creating user-friendly experiences.
                I'm constantly learning new technologies and techniques to improve my skills.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing my knowledge through technical articles and mentorship.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold heading mb-6">My Skills</h3>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold heading mb-6">Education</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Master's Degree in Computer Science</h4>
                    <p className="text-muted-foreground">University of Technology, 2017-2019</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Bachelor's Degree in Software Engineering</h4>
                    <p className="text-muted-foreground">State University, 2013-2017</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
