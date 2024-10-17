frontend-run:
	(cd frontend && npm run start)

frontend-check:
	(cd frontend && npm run format && npm run lint:fix && npm run type-check)

frontend-deploy:
	(cd frontend && npm run predeploy && npm run deploy)