// 移动端菜单切换功能
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}));

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 高德地图初始化
window.initAMap = function() {
    // 创建地图实例
    const map = new AMap.Map('map-container', {
        zoom: 16,
        center: [116.397428, 39.90923], // 默认位置设为北京天安门
        mapStyle: 'amap://styles/normal'
    });

    // 创建标记点
    const marker = new AMap.Marker({
        position: [116.397428, 39.90923],
        title: '公司地址',
        map: map
    });

    // 添加信息窗口
    const infoWindow = new AMap.InfoWindow({
        content: '<div style="padding: 10px;"><h3>人形机器人研发公司</h3><p>地址：北京市朝阳区未来科技大厦</p><p>电话：010-12345678</p></div>',
        offset: new AMap.Pixel(0, -30)
    });

    // 打开信息窗口
    infoWindow.open(map, marker.getPosition());

    // 点击标记点时打开信息窗口
    marker.on('click', function() {
        infoWindow.open(map, marker.getPosition());
    });
};

// 页面加载完成后初始化地图
window.addEventListener('load', function() {
    // 动态加载高德地图API
    const script = document.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=07217540a97d52d9c63315301119469e&callback=initAMap';
    script.onerror = function() {
        console.error('高德地图API加载失败');
        document.getElementById('map-container').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">地图加载失败，请检查网络连接</div>';
    };
    document.head.appendChild(script);
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 76, 129, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 76, 129, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});