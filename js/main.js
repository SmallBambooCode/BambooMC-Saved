// 竹MC的博客 - 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到顶部或锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // 如果是 # 或 空链接，滚动到顶部
            if (href === '#' || href === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 否则滚动到指定元素
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 为外部链接添加 target="_blank"
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 不是当前域名的链接，添加新标签页打开
        if (href && !href.includes(window.location.hostname) && !href.includes('bamboomc.smallbamboo.de')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.card, .nav-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // 添加页面加载动画
    const animateElements = document.querySelectorAll('.card, .nav-card, .page-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
});
