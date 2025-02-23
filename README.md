# Kanban ToDo - 직관적인 업무 관리 솔루션

## 목차

- [[1] 프로젝트 개요](#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%9C%EC%9A%94)
  - [1) 주요 기능](#1-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)
  - [2) 주요 기능 미리보기](#2-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0)
- [[2] 실행 방법](#2-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95)
  - [1) 개발 환경](#1-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD)
  - [2) 의존성 설치](#2-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%84%A4%EC%B9%98)
  - [3) 실행](#3-%EC%8B%A4%ED%96%89)
  - [4) 애플리케이션 접속](#4-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%A0%91%EC%86%8D)
  - [5) 테스트 코드 실행](#5-테스트-코드-실행)
- [[3] 프로젝트 기술 스택 선정 배경](#3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%EC%84%A0%EC%A0%95-%EB%B0%B0%EA%B2%BD)
  - [1) Next.js & TypeScript 도입 이유](#1-nextjs--typescript-%EB%8F%84%EC%9E%85-%EC%9D%B4%EC%9C%A0)
  - [2) @dnd-kit 도입 이유](#2-dnd-kit-%EB%8F%84%EC%9E%85-%EC%9D%B4%EC%9C%A0)
  - [3) Zustand 도입 이유](#3-zustand-%EB%8F%84%EC%9E%85-%EC%9D%B4%EC%9C%A0)
  - [4) date-fns & react-datepicker 도입 이유](#4-date-fns--react-datepicker-%EB%8F%84%EC%9E%85-%EC%9D%B4%EC%9C%A0)
  - [5) TailwindCSS 도입 이유](#5-tailwindcss-%EB%8F%84%EC%9E%85-%EC%9D%B4%EC%9C%A0)
- [[4] 프로젝트 구조](#4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)
  - [1) 파일 및 폴더 구조](#1-%ED%8C%8C%EC%9D%BC-%EB%B0%8F-%ED%8F%B4%EB%8D%94-%EA%B5%AC%EC%A1%B0)
  - [2) 구조 설명](#2-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EB%AA%85)
- [[5] 구현 체크리스트](#5-%EA%B5%AC%ED%98%84-%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8)
  - [1) 태스크(Task) 기능 구현](#1-%ED%83%9C%EC%8A%A4%ED%81%ACtask-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
  - [2) 보드(Column) 기능 구현](#2-%EB%B3%B4%EB%93%9Ccolumn-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
  - [3) 메트릭스 카드 기능 체크리스트](#3-%EB%A9%94%ED%8A%B8%EB%A6%AD%EC%8A%A4-%EC%B9%B4%EB%93%9C-%EA%B8%B0%EB%8A%A5-%EC%B2%B4%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%8A%B8)
  - [4) 데이터 관리](#4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC)
  - [5) 단위 테스트 작성](#5-단위-테스트-작성)
- [[6] 주요 기능 구현](#6-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
  - [1) 드래그 앤 드롭](#1-%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD)
  - [2) 보드 순서 변경 구현 로직](#2-%EB%B3%B4%EB%93%9C-%EC%88%9C%EC%84%9C-%EB%B3%80%EA%B2%BD-%EA%B5%AC%ED%98%84-%EB%A1%9C%EC%A7%81)
  - [3) 상태 관리 시스템](#3-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EC%8B%9C%EC%8A%A4%ED%85%9C)
  - [4) 데이터 구조 설계](#4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EA%B3%84)
- [[7] 마무리하며](#7-%EB%A7%88%EB%AC%B4%EB%A6%AC%ED%95%98%EB%A9%B0)

## [1] 프로젝트 개요

Kanban ToDo는 현대적인 업무 환경에서 필요한 직관적이고 효율적인 작업 관리 도구입니다.<br> Next.js 15와 TypeScript를 기반으로 구축된 이 애플리케이션은 칸반 방식의 보드 시스템을 통해<br> 사용자가 업무를 시각적으로 구조화하고 유연하게 관리할 수 있도록 설계되었습니다.
<br>

### 1) 주요 기능

#### 1. 태스크 관리

1. **태스크 생성** : 각 보드 내에서 새로운 태스크를 손쉽게 추가할 수 있습니다.
2. **태스크 수정** : 태스크의 내용을 클릭하여 즉시 수정할 수 있습니다.
3. **태스크 삭제** : 완료된 태스크를 삭제할 수 있습니다.
4. **태스크 이동** : 드래그 앤 드롭으로 태스크를 다른 보드로 이동하거나 같은 보드 내에서 순서를 변경할 수 있습니다.

#### 2. 보드 관리

1. **보드 생성 및 편집** : 새로운 보드를 생성하고 보드의 제목을 자유롭게 수정할 수 있습니다.
2. **보드 삭제** : 더 이상 필요하지 않은 보드를 삭제할 수 있습니다.
3. **보드 순서 변경** : 드래그 앤 드롭으로 보드의 순서를 직관적으로 변경할 수 있습니다.

#### 3. 데이터 지속성

1. **자동 저장** : 모든 변경사항이 브라우저의 로컬 스토리지에 자동으로 저장됩니다.
2. **상태 유지** : 페이지를 새로고침하거나 브라우저를 다시 열어도 이전 상태가 유지됩니다.
   <br>

### 2) 주요 기능 미리보기

#### 1. 태스크 생성 수정 삭제 및 이동 기능 구현

<div>
 <img src="https://github.com/user-attachments/assets/091f4b72-0697-4fa3-86df-b7d6e186b3a2">
</div>

#### 2. 컬럼 생성 수정 삭제 및 이동 기능 구현

<div>
 <img src="https://github.com/user-attachments/assets/f43ce86d-e12c-466b-ba0a-53d5bba73751">
</div>

#### 3. 컬럼과 동기화된 메트릭스 카드

<div>
  <img src="https://github.com/user-attachments/assets/aaad8e5a-b1bf-49d4-a503-c0f534988569">
</div>

## [2] 실행 방법

### 1) 개발 환경

```bash
Node.js : 22.13.1
npm : 10.9.2
Chrome: 133.0.6943.55(공식 빌드) (arm64)
```

### 2) 의존성 설치

루트 폴더에서 실행합니다.

```
npm install
```

### 3) 실행

루트 폴더에서 실행합니다.

```
npm run dev
```

### 4) 애플리케이션 접속

브라우저를 열고 http://localhost:3000 으로 접속하세요.

### 5) 테스트 코드 실행

1.  아래의 명령어는 프로젝트에 대한 **단위 테스트**를 실행합니다.

- ```
  npm run test
  ```

2.  아래의 명령어는 테스트 실행 후, **테스트 커버리지**를 측정하여 코드의 테스트 비율을 확인할 수 있습니다.

- ```
  npm run coverage
  ```

## [3] 프로젝트 기술 스택 선정 배경

### 1) Next.js & TypeScript 도입 이유

프로젝트의 견고성과 개발 생산성 향상을 위해 Next.js와 TypeScript를 채택했습니다.

#### 주요 이점

- App Router와 서버 컴포넌트를 통한 성능 최적화
- TypeScript를 통한 타입 안정성 확보
- 컴포넌트와 상태 관리 코드의 안정성 향상

### 2) @dnd-kit 도입 이유

드래그 앤 드롭 기능 구현을 위해 여러 라이브러리를 비교 검토한 결과 @dnd-kit을 선택했습니다.<br> 칸반 보드의 핵심 기능인 태스크와 컬럼의 자유로운 이동을 구현하는데 최적화된 라이브러리입니다.

#### 라이브러리 비교 분석

| 라이브러리          | 장점                                                                                                                                                                                                               | 단점                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| react-beautiful-dnd | • 직관적인 API<br>• 풍부한 레퍼런스와 커뮤니티                                                                                                                                                                     | • React 18 지원 문제<br>• 더 이상 적극적인 유지보수가 이루어지지 않음<br>• 터치 디바이스에서 간헐적인 버그 발생 |
| react-draggable     | • 가벼운 번들 사이즈<br>• 단순한 드래그 기능에 적합                                                                                                                                                                | • 정렬 기능 부재<br>• 복잡한 드래그 앤 드롭 시나리오 구현이 어려움                                              |
| @dnd-kit<br>(선택)  | • 모듈화된 구조로 필요한 기능만 선택적 사용 가능<br>• 센서 시스템을 통한 터치/마우스 이벤트 통합 관리<br>• 애니메이션과 정렬 기능 내장<br>• TypeScript 지원으로 안정적인 개발 경험<br>• 활발한 유지보수와 커뮤니티 | • 상대적으로 가파른 학습 곡선<br>                                                                               |

<br>
@dnd-kit의 장점들이 프로젝트의 구현사항과 가장 잘 부합했으며,<br> 특히 TypeScript 지원과 모듈화된 구조는 프로젝트의 확장성과 유지보수성을 크게 향상시킬 것으로 판단했습니다.

### 3) Zustand 도입 이유

전역 상태 관리를 위해 Zustand를 선택했습니다.<br> 칸반 보드의 상태 관리에 있어 Redux보다 간결하고 직관적인 API를 제공합니다.

#### 주요 이점

- 간단한 설정과 보일러플레이트 최소화
- TypeScript 지원으로 타입 안정성 확보
- 불필요한 리렌더링 방지를 통한 성능 최적화
- persist 미들웨어를 통한 자동 상태 저장 및 복원 기능

### 4) date-fns & react-datepicker 도입 이유

태스크의 일정 관리를 위해 date-fns와 react-datepicker를 채택했습니다.

#### 주요 이점

- 선언적인 코드로 빠른 캘린더 UI 구현 가능
- 날짜 범위 선택(Range) 기능 내장
- 다양한 날짜/시간 포맷 커스터마이징 가능
- TypeScript 지원으로 안전한 날짜 처리

### 5) TailwindCSS 도입 이유

UI 개발의 생산성과 일관성을 위해 TailwindCSS를 선택했습니다.

#### 주요 이점

- 유틸리티 클래스를 통한 빠른 스타일링
- JIT 컴파일러를 통한 최적화된 CSS 번들
- 클래스 네이밍 고민 없이 빠른 프로토타입 개발

## [4] 프로젝트 구조

### 1) 파일 및 폴더 구조

```
src/
├── app/                       # Next.js 앱 라우터
│   ├── favicon.ico            # 파비콘
│   ├── globals.css            # 전역 스타일
│   ├── layout.tsx             # 루트 레이아웃
│   └── page.tsx               # 메인 페이지
│
├── components/                # 리액트 컴포넌트
│   ├── kanban/                # 칸반 관련 컴포넌트
│   │   ├── board/             # 보드 관련 컴포넌트
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   ├── KanbanHeader.tsx
│   │   │   ├── KanbanScrollGuide.tsx
│   │   │   └── KanbanTask.tsx
│   │   ├── forms/             # 폼 관련 컴포넌트
│   │   │   ├── KanbanTaskDetail.tsx
│   │   │   └── KanbanTaskForm.tsx
│   │   └── ui/                # UI 컴포넌트
│   │       └── KanbanDropdownMenu.tsx
│   │
│   └── metrics/               # 메트릭스 관련 컴포넌트
│       ├── KanbanMetrics.tsx
│       └── MetricCard.tsx
│
├── hooks/                     # 커스텀 훅
│   └── useDragAndDrop.ts      # 드래그 앤 드롭 커스텀 훅
│
├── stores/                    # Zustand 스토어
│   └── kanban.ts              # 칸반 상태 관리
│
└── types/                     # TypeScript 타입 정의
└── kanban.ts                  # 칸반 관련 타입 정의
```

### 2) 구조 설명

1. **app/**

   - Next.js 13+의 App Router 구조 채택
   - 페이지와 레이아웃 구성

2. **components/**

   - **kanban/board/**: 칸반 보드의 핵심 컴포넌트들
   - **kanban/forms/**: 태스크 생성/수정 관련 폼 컴포넌트
   - **kanban/ui/**: 재사용 가능한 UI 컴포넌트
   - **metrics/**: 상단 메트릭스 표시 컴포넌트

3. **hooks/**

   - 드래그 앤 드롭 로직을 분리한 커스텀 훅

4. **stores/**

   - Zustand를 사용한 상태 관리 로직

5. **types/**
   - 프로젝트 전반에 사용되는 타입 정의

## [5] 구현 체크리스트

### 1) 태스크(Task) 기능 구현

- [x] 태스크 생성

  - [x] 태스크 추가 폼
  - [x] 제목 입력
  - [x] 내용 입력
  - [x] 날짜 선택
  - [x] 유효성 검사

- [x] 태스크 수정

  - [x] 수정 폼 UI
  - [x] 기존 데이터 표시
  - [x] 수정 사항 저장

- [x] 태스크 삭제

  - [x] 삭제 확인 기능
  - [x] 상태 업데이트

- [x] 태스크 이동

  - [x] 보드 내 태스크 순서 변경
  - [x] 보드 간 태스크 이동
  - [x] 드래그 앤 드롭 구현
  - [x] 이동 애니메이션

### 2) 컬럼(Column) 기능 구현

- [x] 컬럼 생성

  - [x] 새 컬럼 추가 버튼
  - [x] 컬럼 제목 입력
  - [x] 제목 미입력 시 생성 방지

- [x] 컬럼 수정

  - [x] 컬럼 제목 수정 기능
  - [x] 인라인 편집 UI
  - [x] 수정 취소 기능 (ESC)

- [x] 컬럼 삭제

  - [x] 삭제 확인 모달
  - [x] 연관된 태스크들 정리
  - [x] 상태 업데이트 처리

- [x] 컬럼 순서 변경
  - [x] 드래그 앤 드롭 구현
  - [x] 순서 변경 애니메이션
  - [x] 상태 동기화

### 3) 메트릭스 카드 기능 체크리스트

- [x] 기본 기능

  - [x] 각 컬럼의 제목과 태스크 개수 표시
  - [x] 카드 레이아웃과 스타일링
  - [x] 호버 효과 (크기 확대, 색상 변경)

- [x] 드래그 앤 드롭

  - [x] 카드 순서 변경 가능
  - [x] 드래그 중 시각적 피드백
  - [x] 애니메이션 효과

- [x] 데이터 관리

  - [x] 컬럼 삭제 기능
  - [x] 삭제 전 확인 대화상자
  - [x] 상태 자동 업데이트

### 4) 데이터 관리

- [x] 로컬 스토리지 연동

  - [x] 상태 자동 저장
  - [x] 페이지 새로고침 시 상태 복원

### 5) 단위 테스트 작성

- [x] kanban의 board 에 대한 단위 테스트 작성
- [x] kanban의 metrics 에 대한 단위 테스트 작성
- [x] hooks 에 대한 단위 테스트 작성
- [x] stores 에 대한 단위 테스트 작성

## [6] 주요 기능 구현

### 1) 드래그 앤 드롭

@dnd-kit을 활용하여 직관적인 드래그 앤 드롭 기능을 구현했습니다.<br> 사용자는 태스크와 컬럼을 자유롭게 이동할 수 있으며, 부드러운 애니메이션 효과로 상호작용할 수 있습니다.

#### 1. 핵심 컴포넌트 구성

**드래그 앤 드롭 컨텍스트 (DndContext)**

- 드래그 앤 드롭의 최상위 컨텍스트를 제공
- 드래그 상태 관리 및 이벤트 핸들링을 담당
- 센서를 통해 사용자의 상호작용을 감지하고 관리

**정렬 가능한 컨텍스트 (SortableContext)**

- `items` prop으로 정렬 가능한 아이템들의 ID 배열을 전달
- 하위 컴포넌트들은 `useSortable` 훅을 통해 드래그 앤 드롭 기능 획득
- 아이템 순서가 변경될 때마다 자동으로 `items` 배열 순서 추적
- 부모 `DndContext`의 `onDragEnd` 이벤트를 통해 순서 변경 처리

  ```typescript
  // DndContext & SortableContext 예시 코드
  <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={columnOrder}>
        {columnOrder.map((columnId) => (
          <KanbanColumn
            key={columnId}
            id={columnId}
            title={column.title}
            taskIds={column.taskIds}
          />
        ))}
      </SortableContext>
    </DndContext>
  ```

  이렇게 SortableContext를 사용하면 복잡한 드래그 앤 드롭 로직을 선언적으로 구현할 수 있습니다.
  컬럼뿐만 아니라 태스크 목록에도 동일한 패턴으로 적용하여 일관된 사용자 경험을 제공합니다.

**상호작용 센서 (Sensors)**

```typescript
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  })
);
```

- `useSensors`: 여러 센서를 조합하여 사용할 수 있게 해주는 훅
- `PointerSensor`: 마우스/터치 이벤트를 통합 관리
- `activationConstraint`: 3픽셀 이상 이동해야 드래그가 시작되도록 설정하여 실수로 인한 드래그 방지

**CSS 유틸리티 (CSS Utilities)**

```typescript
const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.5 : 1,
};
```

- `@dnd-kit/utilities`의 CSS 도구를 사용하여 드래그 중인 요소의 변환 효과 적용
- 부드러운 애니메이션과 시각적 피드백을 위한 스타일 처리
- 드래그 중인 아이템의 투명도 조절로 사용자 피드백 제공

#### 2. 이중 제어 시스템 (메트릭스 카드 & 컬럼)

```typescript
// 메트릭스 카드와 컬럼의 동기화
const { handleDragEnd } = useDragAndDrop({
  columns,
  columnOrder,
  enableTaskDrag: false, // 메트릭스에서는 태스크 드래그 비활성화
});

const metrics = columnOrder.map((columnId) => ({
  id: columnId,
  label: columns[columnId].title,
  value: columns[columnId].taskIds.length,
}));
```

- 작업 관리의 효율성을 높이기 위한 두 가지 제어 지점 제공
  1.  상단 메트릭스 영역
      - Zustand 스토어의 상태를 실시간으로 반영하여 태스크 수 표시
      - 드래그 이벤트 발생 시 컬럼 순서도 함께 업데이트
  2.  메인 보드 영역
      - 동일한 상태를 공유하여 일관된 데이터 유지
      - CSS Transform을 활용한 부드러운 이동 애니메이션

이러한 방식으로 기술적인 구현과 사용자 경험이 조화롭게 결합되어, 직관적이면서도 안정적인 드래그 앤 드롭 시스템을 제공합니다.

#### 3. 커스텀 훅을 통한 유연한 상태 관리

프로젝트는 드래그 앤 드롭의 복잡성을 관리하기 위해 `useDragAndDrop` 커스텀 훅을 개발했습니다.
이 훅은 상태 관리의 모듈성과 재사용성을 높이는 핵심 설계 전략입니다.

```typescript
export const useDragAndDrop = ({
  columns,
  columnOrder,
  enableTaskDrag = true,
}: UseDragAndDropProps) => {
  const moveTask = useKanbanStore((state) => state.moveTask);
  const reorderColumn = useKanbanStore((state) => state.reorderColumn);

  // 태스크 및 컬럼 이동 로직 구현
  const handleDragOver = (event: DragOverEvent) => { ... }
  const handleDragEnd = (event: DragEndEvent) => { ... }

  return { handleDragOver, handleDragEnd };
};
```

#### 커스텀 훅의 주요 특징

- **조건부 드래그 활성화**: `enableTaskDrag` 옵션을 통해 드래그 기능을 유연하게 제어
- **상태 관리 분리**: Zustand 스토어와 연계하여 상태 변경 로직 캡슐화
- **타입 안전성**: TypeScript를 활용한 엄격한 타입 검사
- **재사용성**: 다양한 컨텍스트에서 활용 가능한 범용 훅 설계

#### 4. 구현된 드래그 앤 드롭 기능과 설계 의도

- 태스크 이동 시스템

  - 칸반 보드의 핵심인 태스크 이동을 직관적으로 구현
  - 같은 컬럼 내 순서 변경

    ```typescript
    // 드래그 오버 이벤트 핸들링
    const handleDragOver = (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      // 드래그 중인 태스크와 대상 위치 식별
      const activeId = active.id.toString();
      const overId = over.id.toString();
      if (activeId === overId) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      // 태스크 이동 로직 수행
      moveTask(activeId, activeData.task.columnId, targetColumnId, newIndex);
    };
    ```

    - @dnd-kit의 내장 애니메이션이 자동으로 적용되어 다른 태스크들이 재배치
    - 드래그 중인 태스크는 `isDragging` 상태에 따라 반투명 효과 적용

- 컬럼 간 이동

  ```typescript
  // 태스크의 컬럼 간 이동 처리
  if (activeData.type === 'Task' && activeData.task) {
    let targetColumnId = '';
    let newIndex = 0;

    if (overData.type === 'Task' && overData.task) {
      // 다른 태스크 위로 드래그된 경우
      targetColumnId = overData.task.columnId;
      newIndex = columns[overData.task.columnId].taskIds.indexOf(overId);
    } else if (overData.type === 'Column') {
      // 빈 컬럼으로 드래그된 경우
      targetColumnId = overId;
      newIndex = columns[targetColumnId].taskIds.length;
    }
  }
  ```

  - 태스크와 컬럼의 타입을 구분하여 적절한 이동 로직 적용
  - 빈 컬럼으로의 이동도 자연스럽게 처리

### 2) 보드 순서 변경 구현 로직

#### 드래그 앤 드롭을 통한 직관적인 재정렬

보드 순서 변경 기능은 @dnd-kit 라이브러리를 활용하여 직관적이고 부드러운 사용자 경험을 제공합니다.
`handleDragEnd` 메서드는 컬럼의 동적 재정렬을 가능하게 하는 핵심 로직입니다.

```typescript
const handleDragEnd = (event: DragEndEvent) => {
  // 드래그가 끝난 시점의 이벤트에서 드래그된 아이템(active)과 드롭된 위치의 아이템(over) 추출
  const { active, over } = event;
  // 드롭된 위치가 유효하지 않으면 함수 종료
  if (!over) return;

  // 문자열 형태로 각 아이템의 ID 변환
  const activeId = active.id.toString();
  const overId = over.id.toString();

  // 같은 위치에 드롭된 경우 (제자리) 함수 종료
  if (activeId === overId) return;

  // 드래그된 아이템의 데이터 추출
  const activeData = active.data.current;
  // 데이터가 유효하지 않으면 함수 종료
  if (!activeData) return;

  // 드래그된 아이템이 Column 타입인 경우
  if (activeData.type === 'Column') {
    // 현재 순서에서 드래그된 컬럼의 인덱스와 드롭된 위치의 인덱스 찾기
    const oldIndex = columnOrder.indexOf(activeId);
    const newIndex = columnOrder.indexOf(overId);

    // 컬럼 순서 재정렬 액션 실행
    reorderColumn(oldIndex, newIndex);
  }
};
```

#### 상태 동기화 메커니즘 상세 분석

```typescript
reorderColumn: (oldIndex, newIndex) =>
  set((state) => {
    // 1. 기존 컬럼 순서 배열의 불변성 유지를 위해 복사본 생성
    const newColumnOrder = [...state.board.columnOrder];

    // 2. 이동할 컬럼 ID를 원래 위치에서 제거
    const [removed] = newColumnOrder.splice(oldIndex, 1);

    // 3. 제거된 컬럼 ID를 새로운 위치에 삽입
    newColumnOrder.splice(newIndex, 0, removed);

    // 4. 변경된 컬럼 순서로 상태 업데이트
    return {
      board: {
        ...state.board,
        columnOrder: newColumnOrder,
      },
    };
  }),
```

### 3) 상태 관리 시스템

Zustand를 사용하여 애플리케이션의 상태를 관리하고, persist 미들웨어를 통해 로컬 스토리지와 연동했습니다.

#### 1. 상태 관리 구조

```typescript
interface KanbanStore {
  board: {
    columns: Record<string, Column>; // 컬럼 데이터
    tasks: Record<string, Task>; // 태스크 데이터
    columnOrder: string[]; // 컬럼 순서
  };

  // 액션들
  addColumn: (title: string) => void;
  updateColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
  // ... 기타 액션들
}
```

#### 2. 미들웨어의 역할

미들웨어는 상태 변화가 일어날 때 추가적인 작업을 수행할 수 있게 해주는 중간 계층입니다.

```typescript
export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      board: { columns: {}, tasks: {}, columnOrder: [] },
      addColumn: (title) =>
        set((state) => ({
          board: {
            ...state.board,
            columns: {
              ...state.board.columns,
              [newId]: { id: newId, title, taskIds: [] },
            },
            columnOrder: [...state.board.columnOrder, newId],
          },
        })),
    }),
    { name: 'kanban-storage' }
  )
);
```

#### 3. Persist 미들웨어의 장점

1. **자동 저장**

   - 상태가 변경될 때마다 자동으로 localStorage에 저장
   - 별도의 저장 로직 작성 불필요

2. **상태 복원**

   - 페이지 새로고침 시 자동으로 이전 상태 복원
   - 브라우저를 닫았다 열어도 작업 내용 유지

3. **선택적 저장**

   ```typescript
   {
     partialize: (state) => ({ board: state.board }), // board 상태만 저장
   }
   ```

   - 필요한 상태만 선택하여 저장 가능
   - 불필요한 데이터 저장 방지

이러한 구조로 인해 복잡한 영속성 관리 로직을 간단하게 구현할 수 있으며,<br> 사용자의 작업 내용을 안전하게 보관할 수 있습니다.

### 4) 데이터 구조 설계

초기 구조에서 최적화된 구조로 변경하며 칸반 보드의 데이터 관리 효율성을 개선했습니다.

#### 초기 데이터 구조

```typescript
interface KanbanItem {
  kanbanId: string;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface KanbanBoard {
  boardId: string;
  title: string;
  items: KanbanItem[]; // 배열로 아이템 관리
}
```

#### 개선된 데이터 구조

```typescript
interface Task {
  id: string;
  title: string;
  content: string;
  dueDate: {
    start: Date;
    end: Date;
  };
  columnId: string; // 소속 컬럼 참조
  createdAt: Date;
  updatedAt?: Date;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[]; // 태스크 참조 배열
}

interface Board {
  columns: {
    [key: string]: Column; // 컬럼 해시맵
  };
  tasks: {
    [key: string]: Task; // 태스크 해시맵
  };
  columnOrder: string[]; // 컬럼 순서 배열
}
```

#### 주요 개선 사항과 이점

1. **참조 구조 최적화**

   - 초기 : 배열 내 객체로 직접 데이터 포함
   - 개선 : ID 참조 방식으로 변경
   - 이점
     - 데이터 중복 제거
     - 상태 업데이트 성능 향상
     - 참조 무결성 보장

2. **순서 관리 방식**

   - 초기 : `order` 숫자 필드로 관리
   - 개선 : `taskIds` 배열의 인덱스로 관리
   - 이점
     - 순서 변경 시 전체 재계산 불필요
     - 드래그 앤 드롭 구현 용이
     - 순서 충돌 문제 해결

3. **상태 관리 용이성**

   ```typescript
   // 태스크 이동 예시
   moveTask: (taskId, sourceColId, targetColId, newIndex) =>
     set((state) => ({
       board: {
         ...state.board,
         columns: {
           [sourceColId]: {
             ...state.board.columns[sourceColId],
             taskIds: state.board.columns[sourceColId].taskIds.filter(
               (id) => id !== taskId
             ),
           },
           [targetColId]: {
             ...state.board.columns[targetColId],
             taskIds: [
               ...state.board.columns[targetColId].taskIds.slice(0, newIndex),
               taskId,
               ...state.board.columns[targetColId].taskIds.slice(newIndex),
             ],
           },
         },
       },
     }));
   ```

   - 불변성 유지가 용이
   - 상태 변화 추적 명확

4. **확장성**
   - 데이터 구조 변경 최소화
   - TypeScript와의 높은 호환성

이러한 구조적 개선을 통해 애플리케이션의 성능과 유지보수성이 크게 향상되었으며,
특히 드래그 앤 드롭 기능의 구현과 상태 관리가 더욱 효율적으로 이루어지게 되었습니다.

### [7] 마무리하며

이번 칸반 보드 프로젝트를 통해 @dnd-kit과 React 생태계를 활용하여 직관적인 태스크 관리 시스템을 성공적으로 구현할 수 있었습니다.

가장 인상 깊었던 기술적 도전은 초기의 단순한 배열 기반 데이터 구조를 최적화된 참조 시스템으로 개선하는 과정이었습니다. 처음에는 각 보드가 태스크 배열을 직접 포함하는 방식을 사용했는데, 이는 드래그 앤 드롭 구현과 상태 관리를 복잡하게 만들었습니다. 이를 해결하기 위해 해시맵과 ID 참조 방식으로 전환했고, 이를 통해 접근 성능과 효율적인 상태 관리를 달성할 수 있었습니다.

또한 컬럼과 메트릭스 카드의 동기화 시스템을 구현하면서 상태 관리의 중요성을 깊이 깨달았습니다. Zustand의 단일 스토어로 통합하고 persist 미들웨어를 활용하여 자동 저장 기능까지 구현함으로써, 안정적이고 사용자 친화적인 시스템을 만들 수 있었습니다.

사용자 경험을 개선하기 위한 기능들을 추가했습니다. 특히 태스크의 날짜 관리 시스템은 단순한 시작일/종료일 입력을 넘어, date-fns와 react-datepicker를 활용하여 직관적인 캘린더 UI와 유효성 검사를 제공하도록 구현했습니다.

이 과정을 통해 기술적 구현도 중요하지만, 결국 사용자의 관점에서 필요한 기능이 무엇인지 고민하고 이를 자연스럽게 통합하는 것이 더 중요하다는 것을 배웠습니다. 특히 드래그 앤 드롭 인터페이스를 구현하면서, 복잡한 기술적 구현 뒤에 숨겨진 자연스러운 사용자 경험의 중요성을 체감할 수 있었습니다.

지금까지 저의 긴 글을 읽어주셔서 감사합니다. 🙇‍♂️
