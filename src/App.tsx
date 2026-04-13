/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GradeDashboard } from './pages/GradeDashboard';
import { Lesson } from './pages/Lesson';
import { LabDashboard } from './pages/LabDashboard';
import { AssessmentView } from './pages/AssessmentView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="grade/:gradeId" element={<GradeDashboard />} />
          <Route path="lesson/:gradeId/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="grade/:gradeId/assessment/:bimester" element={<AssessmentView />} />
          <Route path="lab" element={<LabDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

