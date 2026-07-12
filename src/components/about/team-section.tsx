// Team Section — small grid of team member cards.

const team = [
  {
    name: "Farhan Rahman",
    role: "Founder & Curator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Nadia Karim",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Tariq Hasan",
    role: "Product Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sabila Noor",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
];

export function TeamSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-2xl text-center mx-auto">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            The People Behind the Counter
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Meet the Team
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-muted">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-ink">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
