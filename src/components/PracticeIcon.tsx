import { Briefcase, HardHat, Landmark, Scale, Shield, Users } from 'lucide-react';
import type { PracticeAreaItem } from '../data/practiceAreas';

export function PracticeIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: PracticeAreaItem['iconName'];
  className?: string;
}) {
  const props = { className, strokeWidth: 1.75, 'aria-hidden': true as const };
  switch (name) {
    case 'scale':
      return <Scale {...props} />;
    case 'hard-hat':
      return <HardHat {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'briefcase':
      return <Briefcase {...props} />;
    case 'landmark':
      return <Landmark {...props} />;
    case 'shield':
      return <Shield {...props} />;
  }
}
